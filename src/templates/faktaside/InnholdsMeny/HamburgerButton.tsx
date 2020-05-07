import * as React from 'react';
import styled, { css } from 'styled-components';
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

const HamburgerButtonStyle = styled.button`
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

function HamburgerButton(props: React.HTMLAttributes<HTMLButtonElement> & Props) {
  const { isOpen, label, ...rest } = props;

  return (
    <HamburgerButtonStyle aria-expanded={isOpen} {...rest}>
      <HamburgerIcon isOpen={isOpen} />
      <span className="sr-only">{props.label}</span>
    </HamburgerButtonStyle>
  );
}

function HamburgerIcon(props: { isOpen?: boolean }) {
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
      <path d="M 1 1 L 3 1" />
      <path d="M 1 2 L 3 2" />
      <path d="M 1 3 L 3 3" />
    </StyledSvg>
  );
}

export default HamburgerButton;
