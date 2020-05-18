import * as React from 'react';
import styled, { css } from 'styled-components/macro';
import { theme } from '../../../styles/theme';

const removeButtonStyle = css`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const IkonButtonStyle = styled.button`
  ${removeButtonStyle};
  border-radius: 50%;
  height: 2.2rem;
  width: 2.2rem;
  opacity: 0.9;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 0.7;
  }
  &:focus {
    ${theme.focus};
  }
`;

const StyledSvg = styled.svg`
  width: 50%;
  stroke: black;
  stroke-width: 0.4;
  stroke-linecap: round;
`;

interface Props {
  isOpen?: boolean;
  label: string;
}

function InnholdButton(props: React.HTMLAttributes<HTMLButtonElement> & Props) {
  const { isOpen, label, ...rest } = props;

  return (
    <IkonButtonStyle aria-expanded={isOpen} {...rest}>
      <InnholdIkon isOpen={isOpen} />
      <span className="sr-only">{props.label}</span>
    </IkonButtonStyle>
  );
}

const getLine = (i: number) => (
  <>
    <circle cx="1" cy={i} r=".12" />
    <path d={`M 1.8 ${i} L 3.3 ${i}`} />
  </>
);

function InnholdIkon(props: { isOpen?: boolean }) {
  if (props.isOpen) {
    return (
      <StyledSvg viewBox="0.5 0.5 3 3">
        <path d="M 1.2 1.2 L 2.8 2.8" />
        <path d="M 1.2 2.8 L 2.8 1.2" />
      </StyledSvg>
    );
  }

  return (
    <StyledSvg viewBox="0.5 0.5 3 3">
      {getLine(1)}
      {getLine(2)}
      {getLine(3)}
    </StyledSvg>
  );
}

export default InnholdButton;
