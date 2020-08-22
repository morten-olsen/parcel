import { nanoid } from 'nanoid';
import File from '../types/File';

export const downloadLink = (name: string, blob: Blob) => {
  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = name;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

//type SetFilesType = (fn: (files: {[id: string]: File}) => {[id: string]: File}) => any; 
type SetFilesType = any;

export const createFile = (setFiles: SetFilesType, name: string) => {
  const id = nanoid();
  const file: File = {
    name,
    status: 'processing',
  };
  setFiles((files) => ({
    ...files,
    [id]: file,
  }));

  const setContent = (input: Blob | Promise<Blob>) => {
    Promise.resolve(input)
      .then((blob) => {
        setFiles((files) => ({
          ...files,
          [id]: {
            ...files[id],
            blob,
            status: 'success',
          },
        }));
      })
      .catch(setFailed);
  }

  const setFailed = (err: any) => {
    setFiles((files) => ({
      ...files,
      [id]: {
        ...files[id],
        status: 'failed',
        error: err,
      },
    }));
  };

  return {
    setContent,
    setFailed,
  };
};
