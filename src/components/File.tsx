import React from 'react';
import {
  List,
  Button,
  Popconfirm,
} from 'antd';
import {
  DeleteOutlined,
  SyncOutlined,
  IssuesCloseOutlined,
  LockOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import FileType from '../types/File';
import { downloadLink } from '../helpers/files';

interface Props {
  remove: () => void;
  file: FileType;
}

const iconStyle = {
  style: {
    fontSize: 18,
  },
};

const icons: {[name: string]: any} = {
  processing: <SyncOutlined spin {...iconStyle} />,
  failed: <IssuesCloseOutlined {...iconStyle} />,
  success: <LockOutlined {...iconStyle} />,
};

const IconText = ({ icon, text, ...props }) => (
  <Button
    {...props}
    shape="round"
    icon={React.createElement(icon)}
  />
);

const FileView: React.FC<Props> = ({
  file,
  remove,
}) => {
  const icon = icons[file.status];
  const actions = [];

  if (file.blob) {
    actions.push(
      <Popconfirm
        title="Are you sure delete this file?"
        onConfirm={remove}
        okText="Yes"
        cancelText="No"
      >
        <IconText
          icon={DeleteOutlined}
          danger
          text="Delete"
        />
      </Popconfirm>
    );
  }

  if (file.blob) {
    actions.push(
      <IconText
        icon={DownloadOutlined}
        className="msg-download"
        type="primary"
        text="Download"
        onClick={() => downloadLink(file.name, file.blob!)}
      />
    );
  }

  return (
    <List.Item
      actions={actions}
      className="msg-item"
    >
      <List.Item.Meta
        avatar={icon}
        title={file.name}
      />
    </List.Item>
  );
};

export default FileView;
