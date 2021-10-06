import React from "react";
import styled, { css } from "styled-components/macro";
import { theme } from "../../../styles/theme";

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
  border-radius: 0.5rem 0 0 0.5rem;
  height: 2.5rem;
  width: 2.5rem;
  opacity: 0.9;
  display: flex;
  justify-content: center;
  align-items: center;
  &:focus {
    ${theme.focus};
  }
`;

const StyledSvg = styled.svg`
  width: 50%;
  stroke: currentColor;
  stroke-width: 0.4;
  stroke-linecap: round;
`;

interface Props {
  isOpen?: boolean;
  label: string;
}

function MenyButton(props: React.HTMLAttributes<HTMLButtonElement> & Props) {
  const { isOpen, label, ...rest } = props;

  return (
    <IkonButtonStyle aria-expanded={isOpen} {...rest}>
      <InnholdIkon isOpen={isOpen} />
      <span className="sr-only">{props.label}</span>
    </IkonButtonStyle>
  );
}

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
    <StyledSvg viewBox="0 0 17 16">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.8 1.3h1.4v1.4H1.8V1.3zM.5 4V0h4v4h-4zm1.3 3.3h1.4v1.4H1.8V7.3zM.5 10V6h4v4h-4zm2.7 3.3H1.8v1.4h1.4v-1.4zM.5 12v4h4v-4h-4zm16-10.7H5.8v1.4h10.7V1.3zm-10.7 6h10.7v1.4H5.8V7.3zm10.7 6H5.8v1.4h10.7v-1.4z"
        fill="currentColor"
        stroke="none"
      />
    </StyledSvg>
  );
}

export default MenyButton;
