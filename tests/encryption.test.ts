import puppeteer, { Browser, Page } from 'puppeteer';
import path from 'path';
import fs from 'fs-extra';
import { nanoid } from 'nanoid';
import * as openpgp from 'openpgp';

const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

describe('encryption', () => {
  let browser: Browser;
  let page: Page;
  let tmpDir: string;
  let keys: openpgp.PrivateKey;

  const getText = async (elm: any) => {
    const text = await page.evaluate(el => el.textContent, elm);
    return text;
  }

  beforeAll(async () => {
    tmpDir = path.resolve(`.tmp/${nanoid}`);
    await fs.mkdirp(tmpDir);
    const data = await fs.readFile(
      path.join(__dirname, '..', 'test-assets', 'key'),
      'utf-8',
    );
    keys = await openpgp.readPrivateKey({ armoredKey: data });
  });

  beforeEach(async () => {
    browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ]
    });
    page = await browser.newPage();
    (page as any)._client.send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: tmpDir,
    });
    await page.goto(testUrl, {
      waitUntil: 'networkidle2',
    });
  });

  afterEach(async () => {
    await browser.close();
  });

  it('should be able to encrypt a text', async () => {
    await page.click('.send-btn');
    await page.click('.add-text-tab');
    await page.type('.msg-title', 'Foo');
    await page.type('.msg-body', 'Bar');
    await page.click('.msg-add');
    await sleep(300);
    const items = await page.$$('.msg-item');
    expect(items.length).toBe(1);
    const [item] = items;
    const title = await item.$('.ant-list-item-meta-title');
    const titleText = await getText(title);
    expect(titleText).toBe('Foo.txt.asc');
    await page.click('.msg-download');
    await sleep(300);
    const downloadPath = path.join(tmpDir, 'Foo.txt.asc');
    expect(fs.existsSync(downloadPath)).toBe(true);
    const data = await fs.readFile(downloadPath, 'utf-8');
    
    const decrypted = await openpgp.decrypt({
      message: await openpgp.readMessage({ armoredMessage: data }),
      decryptionKeys: keys,
    });
    expect(decrypted.data).toBe('Bar');
  });
});
