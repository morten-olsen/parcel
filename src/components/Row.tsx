import React from 'react';
import styled from 'styled-components';
import { Theme } from '../theme';

interface Props {
  left?: React.ReactNode;
  right?: React.ReactNode;
  title?: string;
  body?: string;
  children?: React.ReactNode;
}

const Cell = styled.div<{ theme: Theme }>`
  padding: ${({ theme }) => theme.margin.medium / 2}px; 
  align-items: center;
`;

const Wrapper = styled(Cell)`
  display: flex;
  flex-direction: row;
  background: #dfe6e9;
  margin-top: ${({ theme }) => theme.margin.medium}px; 
`;

const Title = styled.h2`
  padding: 0px;
  font-size: 22px;
  font-weight: bold;
`

const Main = styled(Cell)`
  flex: 1;
  justify-content: flex-start;
`;

const Row: React.FC<Props> = ({
  left,
  right,
  title,
  body,
  children,
}) => (
  <Wrapper style={{ display: 'flex' }}>
    {left}
    <Main>
      {title && <Title>{title}</Title>}
      {body}
      {children}
    </Main>
    {right}
  </Wrapper>
);

export {
  Cell,
};

export default Row;
