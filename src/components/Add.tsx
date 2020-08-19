import React, { useState } from 'react';
import styled from 'styled-components';
import { Theme } from '../theme';
import AddText from './AddText';
import AddFile from './AddFile';

const Wrapper = styled.div`
`;

const Top = styled.div`
  display: flex;
`;

const Button = styled.button<{
  active: boolean;
  theme: Theme;
}>`
  background: ${({ active }) => active ? '#2c3e50' : 'transparent'};
  padding: ${({ theme }) => theme.margin.medium}px; 
  border: none;
  font: inherit;
  color: inherit;
`;

const Panel = styled.div<{
  theme: Theme;
}>`
  background: #2c3e50;
  color: #fff;
  padding: ${({ theme }) => theme.margin.medium}px; 
`;

const Add: React.FC = () => {
  const [type, setType] = useState<'file' | 'text'>('text');

  return (
    <Wrapper>
      <Top>
        <Button active={type==='text'} onClick={() => setType('text')}>Text</Button>
        <Button active={type==='file'} onClick={() => setType('file')}>File</Button>
      </Top>
      <Panel>
        {type === 'file' && <AddFile />}
        {type === 'text' && <AddText />}
      </Panel>
    </Wrapper>
  );
};

export default Add;
