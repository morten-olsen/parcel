import React from 'react';
import {
  List,
  Button,
} from 'antd';
import {
  DeleteOutlined,
  SyncOutlined,
  IssuesCloseOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { FileType } from '../contexts/Encryption';
import { CheckCircle, XCircle, Download, Trash, Loader } from 'react-feather';

interface Props {
  remove: () => void;
  file: FileType;
}

const downloadLink = (name: string, url: string) => {
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

  return (
    <List.Item
      actions={file.link ? [(
        <IconText
          icon={DeleteOutlined}
          danger
          text="Delete"
          onClick={remove}
        />
      ), (
        <IconText
          icon={DeleteOutlined}
          type="primary"
          text="Download"
          onClick={() => downloadLink(file.name, file.link!)}
        />
      )]: []}
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
