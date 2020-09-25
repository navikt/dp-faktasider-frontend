import * as React from 'react';
import styled from 'styled-components/macro';
import { focusOnRelativeParent } from '../styles/theme';

interface Props {
  id: string;
  /**
   * angir hvor mye luft til vil ha over ankeret ved bruk av hash-lenke, eks '4rem'
   */
  spaceAbove?: string;
  /**
   * angir om du vil ha fokusramme rundt komponenten som mounter Anchor. Da må komponenten du wrapper med ha position: relative | absolute el
   */
  focusOnParent?: boolean;
}

const Container = styled.div<{ focusOnParent?: boolean }>`
  position: relative;
  ${(props) => props.focusOnParent && focusOnRelativeParent};
`;

const AnchorStyle = styled.div<{ spaceAbove?: string }>`
  position: absolute;
  top: -${(props) => props.spaceAbove || '2.5rem'};
  &:focus {
    box-shadow: none;
  }
`;

function Anchor(props: Props) {
  return (
    <Container focusOnParent={props.focusOnParent}>
      <AnchorStyle id={props.id} spaceAbove={props.spaceAbove} tabIndex={props.focusOnParent ? -1 : undefined} />
    </Container>
  );
}

export default Anchor;
