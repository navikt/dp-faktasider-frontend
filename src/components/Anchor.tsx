import * as React from 'react';
import styled from 'styled-components';

interface Props {
  id: string;
  marginTop?: string;
}

const Container = styled.div`
  position: relative;
`;

const AnchorStyle = styled.div<{ marginTop?: string }>`
  position: absolute;
  top: -${(props) => props.marginTop || '2.5rem'};
`;

function Anchor(props: Props) {
  return (
    <Container>
      <AnchorStyle id={props.id} marginTop={props.marginTop} />
    </Container>
  );
}

export default Anchor;
