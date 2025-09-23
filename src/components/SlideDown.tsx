import React, { ReactNode, useReducer } from "react";
import styled, { css } from "styled-components";
import { Collapse } from "react-collapse";
import ChevronButton from "./ChevronButton";

interface Props {
  title: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const Style = styled.div<{ isOpen: boolean }>`
  transition: 0.3s;
  ${(props) =>
    props.isOpen &&
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

  const onClick = () => {
    toggle();
    props.onClick?.();
  };

  return (
    <Style isOpen={open} className={props.className}>
      <ChevronButton title={props.title} open={open} onClick={onClick} />
      <Collapse isOpened={open}>{props.children}</Collapse>
    </Style>
  );
}

export default SlideDown;
