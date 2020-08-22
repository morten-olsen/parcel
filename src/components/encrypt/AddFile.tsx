import React, { useContext, useCallback } from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';
import { FileAddTwoTone } from '@ant-design/icons';
import { useDropzone } from 'react-dropzone';
import EncryptionContext from '../../contexts/Encryption';

const Icon = styled(FileAddTwoTone)`
  font-size: 100px;
  margin-bottom: 20px;
`;

const DropWrapper = styled(Layout)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 50px;
`;

const AddFile: React.FC = () => {
  const { addFile } = useContext(EncryptionContext);
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(addFile);
  }, [])
  const {getRootProps, getInputProps} = useDropzone({ onDrop });
  return (
    <DropWrapper {...getRootProps()}>
      <input {...getInputProps()} />
      <Icon />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </DropWrapper>
  );
};

export default AddFile;
