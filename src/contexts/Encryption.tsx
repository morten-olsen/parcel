import React, {
  useState,
  useCallback,
  useContext,
  createContext,
  ReactNode,
} from 'react';
import * as openpgp from 'openpgp';
import GithubContext from './Github';
import { createFile } from '../helpers/files';
import FileType from '../types/File';

interface EncryptionContextType {
  files: { [id: string]: FileType };
  addFile: (file: File) => Promise<void>;
  addText: (text: string, name: string) => Promise<void>;
  deleteFile: (id: string) => void;
}

type EncryptionProviderProps = {
  children: ReactNode;
};

const EncryptionContext = createContext<EncryptionContextType>({
  files: {},
  addFile: async () => {
    throw new Error('Not using provider');
  },
  addText: async () => {
    throw new Error('Not using provider');
  },
  deleteFile: async () => {
    throw new Error('Not using provider');
  },
});

const encrypt = async (keys: string[], content: string) => {
  const armoredKeys = await Promise.all(
    keys.map((key) => openpgp.readKeys({ armoredKeys: key }))
  );
  const message = await openpgp.createMessage({ text: content });
  const encrypted = await openpgp.encrypt({
    message,
    encryptionKeys: armoredKeys.reduce<any>(
      (output, key: any) => [...output, ...key],
      []
    ),
  });
  const data = encrypted;
  const blob = new Blob([data as any], {
    type: 'text/text',
  });
  return blob;
};

const EncryptionProvider: React.FC<EncryptionProviderProps> = ({
  children,
}) => {
  const { username, keys } = useContext(GithubContext);
  const [files, setFiles] = useState<EncryptionContextType['files']>({});

  const deleteFile = useCallback(
    (id: string) => {
      delete files[id];
      setFiles({
        ...files,
      });
    },
    [files]
  );

  const addFile = useCallback(
    async (file: File) => {
      if (!keys) {
        return;
      }
      const addedFile = createFile(setFiles, `${file.name}.acs`);
      const reader = new FileReader();

      (reader.onabort = addedFile.setFailed),
        (reader.onerror = addedFile.setFailed),
        (reader.onload = () => {
          addedFile.setContent(encrypt(keys, reader.result as string));
        });
      reader.readAsText(file);
    },
    [keys, username]
  );

  const addText = useCallback(
    async (text: string, name: string) => {
      if (!keys) {
        return;
      }
      const file = createFile(setFiles, `${name}.txt.asc`);
      file.setContent(encrypt(keys, text));
    },
    [keys, username]
  );

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

export { EncryptionProvider };

export default EncryptionContext;
