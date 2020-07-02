import * as React from 'react';
import BlockContent from '../BlockContent';
import styled from 'styled-components';
import { Ingress } from 'nav-frontend-typografi';
import { Group } from '../../../utils/richTextUtils/richTextTypes';
import { useGroupMarkupAriaProps } from './useGroupMarkupAriaProps';

const StyledSection = styled.section`
  margin: 3rem 0 2rem;
`;

const StyledIngress = styled(Ingress)`
  margin-bottom: 1rem;
  font-weight: 600 !important;
`;

function H3GroupMarkup(props: Group) {
  const { regionProps, headerProps } = useGroupMarkupAriaProps(props);

  return (
    <StyledSection {...regionProps}>
      <StyledIngress tag="h3" {...headerProps}>
        {props.title}
      </StyledIngress>
      <BlockContent blocks={props.children} />
    </StyledSection>
  );
}

export default H3GroupMarkup;
