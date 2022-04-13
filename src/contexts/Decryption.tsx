import React, { useState, useCallback, useContext, createContext, useEffect } from 'react';
import { readMessage, readKey, decrypt as pgpDecrypt, readPrivateKeys, readPrivateKey, generateKey } from 'openpgp';
import GithubContext from './Github';
import FileType from '../types/File';
import { createFile } from '../helpers/files';

interface DecryptionContextType {
  publicKey: string | undefined;
  privateKey: string | undefined;
  createKey: (name: string, email: string) => void;
  deleteKey: () => void;
  files: {[id: string]: FileType};
  addFile: (file: File) => Promise<void>;
  deleteFile: (id: string) => void;
}

const removeExtension = (name: string) => {
  const parts = name.split('.');
  parts.pop();
  return parts.join('.');
};

const DecryptionContext = createContext<DecryptionContextType>({
  publicKey: undefined,
  privateKey: undefined,
  files: {},
  createKey: async () => { throw new Error('Not using provider'); },
  deleteKey: async () => { throw new Error('Not using provider'); },
  addFile: async () => { throw new Error('Not using provider'); },
  deleteFile: async () => { throw new Error('Not using provider'); },
});

const decrypt = async (privateKey: string, keys: string[], content: string) => {
  const armoredKeys = await Promise.all(
    keys.map(key => readKey({ armoredKey: key })),
  );
  const message = await readMessage({ armoredMessage: content });
  const encrypted = await pgpDecrypt({
    message,
    decryptionKeys: await readPrivateKeys({ armoredKeys: privateKey }),
    verificationKeys: armoredKeys.reduce<any>((output, key: any) => [...output, ...key], []),
  });
  const { data } = encrypted;
  const blob = new Blob([data as any], {
    type: 'text/text',
  });
  return blob;
};

const DecryptionProvider: React.FC = ({
  children,
}) => {
  const { keys } = useContext(GithubContext);
  const [privateKey, setPrivateKey] = useState<string | undefined>(undefined);
  const [publicKey, setPublicKey] = useState<string | undefined>(undefined);
  const [files, setFiles] = useState<DecryptionContextType['files']>({});

  const deleteFile = useCallback((id: string) => {
    delete files[id];
    setFiles({
      ...files,
    });
  }, [files]);

  useEffect(() => {
    const run = async () => {
      const currentRawKey = localStorage.getItem('key');
      if (currentRawKey) {
        setPrivateKey(currentRawKey);
        const key = await readPrivateKey({ armoredKey: currentRawKey });
        setPublicKey(key.toPublic().armor());
      }
    };

    run();
  }, []);

  const deleteKey = () => {
    setPublicKey(undefined);
    setPrivateKey(undefined);
    localStorage.removeItem('key');
  };

  const createKey = async () => {
    const key = await generateKey({
      userIDs: [{ name: 'unknown unknown', email: 'unknown@unknown.foo'}],
      curve: 'ed25519',
    });

    setPrivateKey(key.privateKey);
    setPublicKey(key.publicKey);
    localStorage.setItem('key', key.privateKey);
  }

  const addFile = useCallback(async (file: File) => {
    if (!keys || !privateKey) return;
    const addedFile = createFile(setFiles, removeExtension(file.name));
    const reader = new FileReader()

    reader.onabort = addedFile.setFailed,
    reader.onerror = addedFile.setFailed,
    reader.onload = () => {
      addedFile.setContent(
        decrypt(privateKey, keys, reader.result as string),
      );
    }
    reader.readAsText(file);
  }, [keys, privateKey]);

  return (
    <DecryptionContext.Provider
      value={{
        publicKey,
        privateKey,
        createKey,
        deleteKey,
        files,
        addFile,
        deleteFile,
      }}
    >
      {children}
    </DecryptionContext.Provider>
  );
};

export {
  DecryptionProvider,
};

export default DecryptionContext;;
