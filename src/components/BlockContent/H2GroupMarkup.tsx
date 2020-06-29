import * as React from 'react';
import BlockContent from './BlockContent';
import styled, { css } from 'styled-components';
import { Group, isH3Group } from '../../utils/richTextUtils/richTextTypes';
import { theme } from '../../styles/theme';
import { Systemtittel } from 'nav-frontend-typografi';
import H2GroupMenu from './H2GroupMenu';
import withErrorBoundary from '../withErrorBoundary';

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
  max-width: 100vw;
`;

const StyledSystemtittel = styled(Systemtittel)`
  margin-bottom: 2rem !important;
  text-align: center;
`;

function H2GroupMarkup(props: Group) {
  const id = props.config?.id;
  const underGrupper = props.children.filter(isH3Group);

  const content = (
    <StyledArticle background={!props.config?.noBackground} aria-labelledby={id}>
      <StyledSystemtittel tag="h2" id={id} tabIndex={-1}>
        {props.title}
      </StyledSystemtittel>
      {props.config?.meny && <H2GroupMenu underGrupper={underGrupper} />}
      <BlockContent blocks={props.children} />
    </StyledArticle>
  );

  return content;
}

export default withErrorBoundary(H2GroupMarkup, 'H2GroupMarkup');
