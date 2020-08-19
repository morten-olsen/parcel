import React, {useMemo} from 'react';
import {
  List,
  Button,
} from 'antd';
import {
  DeleteOutlined,
  SyncOutlined,
  IssuesCloseOutlined,
  LockOutlined,
  DownloadOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { FileType } from '../contexts/Encryption';

interface Props {
  remove: () => void;
  file: FileType;
}

const downloadLink = (name: string, blob: Blob) => {
  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = name;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

const icons: {[name: string]: any} = {
  encrypting: <SyncOutlined spin />,
  failed: <IssuesCloseOutlined />,
  encrypted: <LockOutlined />,
};

const share = async (file: FileType, fileData: File[]) => {
  try {
    navigator.share({
      title: file.name,
      files: fileData,
    } as any);
  } catch (err) {
    alert(err);
  }
}

const IconText = ({ icon, text, ...props }) => (
  <Button
    {...props}
    icon={React.createElement(icon)}
  >
    {text}
  </Button>
);

const FileView: React.FC<Props> = ({
  file,
  remove,
}) => {
  const icon = icons[file.status];
  const fileData = useMemo(() => [new File([file.link || ''], file.name, {
    type: 'text/plain',
  })], [file]);

  const actions = [];

  if (file.link) {
    actions.push(
      <IconText
        icon={DeleteOutlined}
        danger
        text="Delete"
        onClick={remove}
      />
    );
  }

  if (!!navigator.share && (navigator as any).canSare && (navigator as any).canShare({ files: fileData })) {
    actions.push(
      <IconText
        icon={ShareAltOutlined}
        text="Share"
        onClick={() => share(file, fileData)}
      />
    );
  }

  if (file.link) {
    actions.push(
      <IconText
        icon={DownloadOutlined}
        type="primary"
        text="Download"
        onClick={() => downloadLink(file.name, file.link!)}
      />
    );
  }

  return (
    <List.Item
      actions={actions}
    >
      <List.Item.Meta
        avatar={icon}
        title={file.name}
        description={`Encrypted for ${file.reciever}`}
      />
    </List.Item>
  );
};

export default FileView;
