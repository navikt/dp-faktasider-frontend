import * as React from 'react';
import BlockContent from './BlockContent';
import styled from 'styled-components';

interface Props {
  node: {
    sanityChildren: any;
  };
}

const Style = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 2rem 0;
`;

function Bolk(props: Props) {
  return (
    <Style>
      <BlockContent blocks={props.node.sanityChildren} />
    </Style>
  );
}

export default Bolk;
