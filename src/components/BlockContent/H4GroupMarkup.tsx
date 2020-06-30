import * as React from 'react';
import BlockContent from './BlockContent';
import styled from 'styled-components';
import { Element } from 'nav-frontend-typografi';
import { Group } from '../../utils/richTextUtils/richTextTypes';

const StyledSection = styled.section`
  margin: 3rem 0 2rem;
`;

const StyledElement = styled(Element)`
  text-align: center;
  margin: 3rem 0 0.7rem;
`;

function H4GroupMarkup(props: Group) {
  const id = props.blockConfig?.id;

  return (
    <StyledSection aria-labelledby={id}>
      <StyledElement tag="h4" id={id} tabIndex={-1}>
        {props.title}
      </StyledElement>
      <BlockContent blocks={props.children} />
    </StyledSection>
  );
}

export default H4GroupMarkup;
