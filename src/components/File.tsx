import React from 'react';
import styled from 'styled-components';
import { File } from '../contexts/Encryption';
import { CheckCircle, XCircle, Download, Trash, Loader } from 'react-feather';
import Row, { Cell } from './Row';

interface Props {
  remove: () => void;
  file: File;
}

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
            <a target="_blank" href={file.link}>
              <Button><Download /></Button>
            </a>
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
