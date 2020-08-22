import React, {useMemo} from 'react';
import {
  List,
  Button,
  Tooltip,
  Popconfirm,
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
import { downloadLink } from '../helpers/files';

interface Props {
  remove: () => void;
  file: FileType;
}

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
  />
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
