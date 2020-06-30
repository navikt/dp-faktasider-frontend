import * as React from 'react';
import BlockContent from './BlockContent';
import styled from 'styled-components';
import { Ingress } from 'nav-frontend-typografi';
import { Group } from '../../utils/richTextUtils/richTextTypes';

const StyledSection = styled.section`
  margin: 3rem 0 2rem;
`;

const StyledIngress = styled(Ingress)`
  margin-bottom: 1rem;
  font-weight: 600 !important;
`;

function H3GroupMarkup(props: Group) {
  const id = props.blockConfig?.id;

  return (
    <StyledSection aria-labelledby={id}>
      <StyledIngress tag="h3" id={id} tabIndex={-1}>
        {props.title}
      </StyledIngress>
      <BlockContent blocks={props.children} />
    </StyledSection>
  );
}

export default H3GroupMarkup;
