import React, { useState, useCallback, useContext } from 'react';
import styled from 'styled-components';
import EncryptionContext from '../contexts/Encryption';
import { Theme } from '../theme';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Text = styled.textarea<{
  theme: Theme;
}>`
  border: none;
  height: 200px;
  background: transparent;
  color: inherit;
  padding: ${({ theme }) => theme.margin.medium}px; 
  font: inherit;
`;

const AddText : React.FC = () => {
  const { addText } = useContext(EncryptionContext);
  const [text, setText] = useState('');

  const add = useCallback(() => {
    addText(text);
    setText('');
  }, [text, addText]);

  return (
    <Wrapper>
      <Text placeholder="Enter you message..." value={text} onChange={evt => setText(evt.target.value)} />
      <button onClick={add}>Save</button>
    </Wrapper>
  );
};

export default AddText;

