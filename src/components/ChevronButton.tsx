import React from "react";
import styled from "styled-components/macro";
import { Chevron } from "./faktaside/Meny/Chevron";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  open: boolean;
  title: string;
  onClick: () => void;
}

const StyledButton = styled.button`
  padding: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
  text-decoration: none !important;
  display: flex;
  align-items: center;

  svg {
    margin-left: 0.2rem;
    margin-top: 0.2rem;
  }
`;

function ChevronButton({ open, title, ...rest }: Props) {
  return (
    <StyledButton aria-expanded={open} {...rest}>
      {title} <Chevron retning={open ? "opp" : "ned"} />
    </StyledButton>
  );
}

export default ChevronButton;
