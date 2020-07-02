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
  fill: currentColor;
  width: 1em;
  opacity: 0.3;
  transition: 0.15s;
  ${StyledA}:hover & {
    opacity: 0.7;
  }
`;

function LinkIcon() {
  return (
    <StyledSVG viewBox="0 0 24 24">
      <path d="M4 12c0-2 1-3 3-3h4V7H7a5 5 0 000 10h4v-2H7c-2 0-3-1-3-3zm4 1h8v-2H8v2zm9-6h-4v2h4a3 3 0 010 6h-4v2h4a5 5 0 000-10z" />
    </StyledSVG>
  );
}

export default HashLink;
