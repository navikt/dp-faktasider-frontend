import * as React from 'react';
import BlockContent from './BlockContent';
import styled from 'styled-components';
import { Bolk } from '../../utils/richTextUtils/richTextTypes';
import { theme } from '../../styles/theme';
import { Systemtittel } from 'nav-frontend-typografi';
import { idFromString } from '../../utils/routingUtils';

interface Props {
  node: Bolk;
}

const StyledArticle = styled.article`
  background-color: white;
  padding: 1.5rem 3rem;
  @media (${theme.media.smallScreen}) {
    padding: 1.5rem 5vw;
  }
  border-radius: ${theme.borderRadius};
  margin-bottom: ${theme.layoutMargin};
  ${theme.fadeInAnimation};
  max-width: 100vw;
`;

const StyledSystemtittel = styled(Systemtittel)`
  margin-bottom: 2rem !important;
  text-align: center;
`;

function BolkMarkup(props: Props) {
  const id = idFromString(props.node.tittel);

  return (
    <StyledArticle aria-labeledby={id}>
      <StyledSystemtittel tag="h2" id={id} tabIndex={-1}>
        {props.node.tittel}
      </StyledSystemtittel>
      <BlockContent blocks={props.node.children} />
    </StyledArticle>
  );
}

export default BolkMarkup;
