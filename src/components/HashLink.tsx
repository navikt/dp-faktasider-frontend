import * as React from 'react';
import styled from 'styled-components';

const StyledA = styled.a`
  position: absolute;
  left: -1.2em;
  color: currentColor;
`;

const Wrapper = styled.span`
  position: relative;
`;

interface Props {
  id: string;
  ariaLabel: string;
}

function HashLink(props: Props) {
  return (
    <Wrapper>
      <StyledA aria-label={props.ariaLabel} href={`#${props.id}`}>
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
  height: 0.7em;
  opacity: 0.4;
  transition: 0.15s;
  ${StyledA}:hover & {
    opacity: 0.7;
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
