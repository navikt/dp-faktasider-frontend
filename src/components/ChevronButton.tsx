import * as React from "react";
import styled from "styled-components/macro";
import NavFrontendChevron from "nav-frontend-chevron";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  open: boolean;
  title: string;
  onClick: () => void;
}

const StyledButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  text-decoration: none !important;
`;

function ChevronButton({ open, title, ...rest }: Props) {
  return (
    <StyledButton {...rest}>
      {title} <NavFrontendChevron type={open ? "opp" : "ned"} />
    </StyledButton>
  );
}

export default ChevronButton;
