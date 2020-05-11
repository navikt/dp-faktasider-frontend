import * as React from 'react';
import BlockContent from './BlockContent';
import styled, { css } from 'styled-components';
import { H2Group } from '../../utils/richTextUtils/richTextTypes';
import { theme } from '../../styles/theme';
import { Systemtittel } from 'nav-frontend-typografi';
import { idFromString } from '../../utils/routingUtils';

interface Props {
  node: H2Group;
}

const StyledArticle = styled.article<{ background: boolean }>`
  ${(props) =>
    props.background &&
    css`
      background-color: white;
      padding: 1.5rem 3rem;
      @media (${theme.media.smallScreen}) {
        padding: 1.5rem 5vw;
      }
      border-radius: ${theme.borderRadius};
    `};
  margin-bottom: ${theme.layoutMargin};
  ${theme.fadeInAnimation};
  max-width: 100vw;
`;

const StyledSystemtittel = styled(Systemtittel)`
  margin-bottom: 2rem !important;
  text-align: center;
`;

function H2GroupMarkup(props: Props) {
  const id = idFromString(props.node.tittel);

  return (
    <StyledArticle background={!props.node.noBackground} aria-labeledby={id}>
      <StyledSystemtittel tag="h2" id={id} tabIndex={-1}>
        {props.node.tittel}
      </StyledSystemtittel>
      <BlockContent blocks={props.node.children} />
    </StyledArticle>
  );
}

export default H2GroupMarkup;
