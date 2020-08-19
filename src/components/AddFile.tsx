import React, { useContext, useCallback } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import EncryptionContext from '../contexts/Encryption';
import { Upload } from 'react-feather';

const DropWrapper = styled.div`
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
    <div>
    <DropWrapper {...getRootProps()}>
      <input {...getInputProps()} />
      <Upload size={200} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </DropWrapper>
    </div>
  );
};

export default AddFile;
