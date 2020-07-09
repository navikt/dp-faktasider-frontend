import * as React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { loggHashlenkeKlikk } from '../utils/logging';

const StyledA = styled.a`
  position: absolute;
  right: calc(-1rem - 0.6em);
  transform: translateY(0.1em);
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
    <Wrapper aria-hidden={true}>
      <StyledA href={`#${props.id}`} onClick={loggHashlenkeKlikk}>
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
