import React from 'react';
import styled from 'styled-components';
import { File } from '../contexts/Encryption';
import { CheckCircle, XCircle, Download, Trash, Loader } from 'react-feather';
import Row, { Cell } from './Row';

interface Props {
  remove: () => void;
  file: File;
}

const downloadLink = (name: string, url: string) => {
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = name;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

const Button = styled.button`
  background: none;
  border: none;
  color: green;
`;

const icons: {[name: string]: typeof CheckCircle} = {
  encrypting: Loader,
  failed: XCircle,
  encrypted: CheckCircle,
};

const FileView: React.FC<Props> = ({
  file,
  remove,
}) => {
  const Icon = icons[file.status];

  return (
    <Row
      left={(
        <Cell><Icon /></Cell>
      )}
      title={file.name}
      body={`encrypted for ${file.reciever}`}
      right={!!file.link && (
        <>
          <Cell>
            <Button onClick={() => downloadLink(file.name, file.link)}><Download /></Button>
          </Cell>
          <Cell>
            <Button onClick={remove}><Trash /></Button>
          </Cell>
        </>
      )}
    />
  );
};

export default FileView;
