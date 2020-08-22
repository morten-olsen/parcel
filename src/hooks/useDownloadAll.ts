import { useState, useContext, useCallback } from 'react';
import EncryptionContext from '../contexts/Encryption';
import Zip from 'jszip';
import { downloadLink } from '../helpers/files';

type Statuses = 'packing' | 'ready';

const useDownloadAll = () => {
  const [status, setStatus] = useState<Statuses>('ready');
  const { files } = useContext(EncryptionContext);
  const allFilesReady = Object.values(files).filter(f => f.link).length > 1;

  const downloadAll = useCallback(() => {
    setStatus('packing');
    const run = async () => {
      const zip = new Zip();
      Object.values(files).map((file) => {
        zip.file(file.name, file.link!);
      });
      const link = await zip.generateAsync({ type: 'blob' });
      setStatus('ready');
      downloadLink('all-files.zip', link);
    };
    run();
  }, [files]);

  return {
    status,
    downloadAll: allFilesReady ? downloadAll : undefined,
  };
};

export default useDownloadAll;
