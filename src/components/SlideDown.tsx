import * as React from 'react';
import { ReactNode, useState } from 'react';
import styled, { css } from 'styled-components';
import { Collapse } from 'react-collapse';
import { NedChevron, OppChevron } from 'nav-frontend-chevron';

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

const StyledButton = styled.div`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

function SlideDown(props: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Style open={open} className={props.className}>
      <StyledButton onClick={() => setOpen((o) => !o)}>
        {props.title} {open ? <OppChevron /> : <NedChevron />}
      </StyledButton>
      <Collapse isOpened={open}>{props.children}</Collapse>
    </Style>
  );
}

export default SlideDown;
