interface FileBase {
  name: string;
  status: string;
  blob?: Blob;
}

interface FileProcessing extends FileBase {
  name: string;
  status: 'processing';
}

interface FileFailed extends FileBase {
  status: 'failed',
  error: any;
}

interface FileSuccess extends FileBase {
  status: 'success';
  blob: Blob;
}

type FileType = FileProcessing | FileFailed | FileSuccess;

export default FileType;
