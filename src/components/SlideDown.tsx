import * as React from 'react';
import { ReactNode, useReducer } from 'react';
import styled, { css } from 'styled-components/macro';
import { Collapse } from 'react-collapse';
import ChevronButton from './ChevronButton';

interface Props {
  title: string;
  children: ReactNode;
  className?: string;
}

const Style = styled.div<{ open: boolean }>`
  transition: 0.3s;
  ${(props) =>
    props.open &&
    css`
      padding-left: 0.5rem;
      border-left: solid 0.2rem #6668;
      > *:first-child {
        margin-bottom: 0.5rem;
      }
    `}
`;

function SlideDown(props: Props) {
  const [open, toggle] = useReducer((state) => !state, false);

  return (
    <Style open={open} className={props.className}>
      <ChevronButton title={props.title} open={open} onClick={toggle} />
      <Collapse isOpened={open}>{props.children}</Collapse>
    </Style>
  );
}

export default SlideDown;
