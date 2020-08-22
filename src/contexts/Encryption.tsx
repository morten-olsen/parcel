import React, { useState, useCallback, useContext, createContext } from 'react';
import * as openpgp from 'openpgp';
import GithubContext from './Github';
import { createFile } from '../helpers/files';
import FileType from '../types/File';

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

  const addFile = useCallback(async (file: File) => {
    if (!keys) return;
    const addedFile = createFile(setFiles, `${file.name}.acs`);
    const reader = new FileReader()

    reader.onabort = addedFile.setFailed,
    reader.onerror = addedFile.setFailed,
    reader.onload = () => {
      addedFile.setContent(
        encrypt(keys, reader.result as string),
      );
    }
    reader.readAsText(file)
  }, [keys, username]);

  const addText = useCallback(async (text: string, name: string) => {
    if (!keys) return;
    const file = createFile(setFiles, `${name}.txt.asc`);
    file.setContent(
      encrypt(keys, text),
    );
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

