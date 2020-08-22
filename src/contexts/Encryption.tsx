import React, { useState, useCallback, useContext, createContext } from 'react';
import * as openpgp from 'openpgp';
import { nanoid } from 'nanoid';
import { message } from 'antd';
import GithubContext from './Github';

export interface FileType {
  name: string;
  reciever: string;
  status: 'encrypting' | 'failed' | 'encrypted';
  error?: any;
  link?: Blob;
}

interface EncryptionContextType {
  files: {[id: string]: FileType};
  addFile: (file: File) => Promise<void>;
  addText: (text: string, name: string) => Promise<void>;
  deleteFile: (id: string) => void;
}

const EncryptionContext = createContext<EncryptionContextType>({
  files: {},
  addFile: async () => { throw new Error('Not using provider'); },
  addText: async () => { throw new Error('Not using provider'); },
  deleteFile: async () => { throw new Error('Not using provider'); },
});

const encrypt = async (keys: string[], content: string) => {
  const armoredKeys = await Promise.all(keys.map(openpgp.key.readArmored));
  console.log(armoredKeys);
  const message = openpgp.message.fromText(content);
  const encrypted = await openpgp.encrypt({
    message,
    armor: true,
    publicKeys: armoredKeys.reduce<any>((output, key: any) => [...output, ...key.keys], []),
  });
  const { data } = encrypted;
  const blob = new Blob([data], {
    type: 'text/text',
  });
  return blob;
};

const EncryptionProvider: React.FC = ({
  children,
}) => {
  const { username, keys } = useContext(GithubContext);
  const [files, setFiles] = useState<EncryptionContextType['files']>({});

  const deleteFile = useCallback((id: string) => {
    delete files[id];
    setFiles({
      ...files,
    });
  }, [files]);

  const add = (name: string) => {
    const id = nanoid();
    const file: FileType = {
      name: `${name}.asc`,
      reciever: username,
      status: 'encrypting',
    };
    setFiles(files => ({
      ...files,
      [id]: file,
    }));

    const setError = (err: any) => {
      console.error(err);
      setFiles(files => ({
        ...files,
        [id]: {
          ...files[id],
          status: 'failed',
          error: err,
        },
      }));
      message.error(`Failed to encrypt ${name}`);
    };

    const setContent = (text: string, keys: string[]) => {
      const run = async () => {
        try {
          const encrypted = await encrypt(keys, text);
          setFiles(files => ({
            ...files,
            [id]: {
              ...files[id],
              link: encrypted,
              status: 'encrypted'
            },
          }));
          message.success(`Done encrypting ${name}`);
        } catch (err) {
          setError(err);
        }
      };
      run();
    };

    return {
      setContent,
      setError,
    };
  }

  const addFile = useCallback(async (file: File) => {
    if (!keys) return;
    const addedFile = add(file.name);
    const reader = new FileReader()

    reader.onabort = addedFile.setError,
    reader.onerror = addedFile.setError,
    reader.onload = () => {
      addedFile.setContent(reader.result as string, keys);
    }
    reader.readAsText(file)
  }, [keys, username]);

  const addText = useCallback(async (text: string, name: string) => {
    if (!keys) return;
    const file = add(`${name}.txt`);
    file.setContent(text, keys);
  }, [keys, username]);

  return (
    <EncryptionContext.Provider
      value={{
        files,
        addFile,
        addText,
        deleteFile,
      }}
    >
      {children}
    </EncryptionContext.Provider>
  );
};

export {
  EncryptionProvider,
};

export default EncryptionContext;

