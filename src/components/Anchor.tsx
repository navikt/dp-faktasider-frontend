import * as React from 'react';
import styled, { css } from 'styled-components/macro';
import { theme } from '../styles/theme';

interface Props {
  id: string;
  /**
   * angir hvor mye luft til vil ha over ankeret ved bruk av hash-lenke
   */
  marginTop?: string;
  /**
   * angir om du vil ha fokusramme rundt komponenten som mounter Anchor. Da må komponenten du wrapper med ha position: relative | absolute el
   */
  focusOnParent?: boolean;
}

const Container = styled.div<{ focusOnParent?: boolean }>`
  position: relative;
  ${(props) =>
    props.focusOnParent &&
    css`
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      pointer-events: none;
    `}
`;

const AnchorStyle = styled.div<{ marginTop?: string }>`
  position: absolute;
  top: -${(props) => props.marginTop || '2.5rem'};
  &:focus {
    box-shadow: none;
  }
`;

const FocusOutline = styled.div`
  transition: 0.1s;
  &:focus-within {
    ${theme.focus};
    height: 100%;
    width: 100%;
    border-radius: 0.2rem;
  }
`;

function Anchor(props: Props) {
  return (
    <Container focusOnParent={props.focusOnParent}>
      <FocusOutline>
        <AnchorStyle id={props.id} marginTop={props.marginTop} tabIndex={props.focusOnParent ? -1 : undefined} />
      </FocusOutline>
    </Container>
  );
}

export default Anchor;
