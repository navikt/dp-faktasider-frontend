import * as React from "react";
import styled from "styled-components/macro";
import { theme } from "../styles/theme";

const StyledA = styled.a`
  margin-left: 0.5rem;
  transform: translateY(0.1em);
  display: inline-block;
  color: ${theme.colors.lenke};
`;

const Wrapper = styled.span`
  position: relative;
`;

interface Props {
  id: string;
}

function HashLink(props: Props) {
  return (
    <Wrapper>
      <StyledA aria-label=" Ankerlenke" href={`#${props.id}`}>
        <LinkIcon />
      </StyledA>
    </Wrapper>
  );
}

const StyledSVG = styled.svg`
  stroke: currentColor;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2.5;
  height: calc(0.5rem + 0.4em);
  opacity: 0.6;
  transition: 0.15s;
  ${StyledA}:hover & {
    opacity: 1;
  }
`;

function LinkIcon() {
  return (
    <StyledSVG viewBox="0 0 24 24">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </StyledSVG>
  );
}

export default HashLink;
