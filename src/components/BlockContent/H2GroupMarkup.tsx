import * as React from 'react';
import BlockContent from './BlockContent';
import styled, { css } from 'styled-components/macro';
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
  position: relative;
`;

const StyledSystemtittel = styled(Systemtittel)`
  text-align: center;
  position: sticky !important;
  top: 0;
  z-index: 10;
  &:target {
    top: -2rem;
  }
`;

const BackgroundColor = styled.div<{ noBackground?: boolean }>`
  background-color: ${(props) => (props.noBackground ? theme.colors.bakgrunn : '#fffe')};
  padding: 0.5rem;
`;

const ContentStyle = styled.div`
  margin-top: 1.5rem;
`;

function H2GroupMarkup(props: Group) {
  const id = props.blockConfig?.id;
  const noBackground = props.blockConfig?.noBackground;
  const underGrupper = props.children.filter(isH3Group);

  const content = (
    <StyledArticle background={!noBackground} aria-labelledby={id}>
      <StyledSystemtittel tag="h2" id={id} tabIndex={-1}>
        <BackgroundColor noBackground={noBackground}>{props.title}</BackgroundColor>
      </StyledSystemtittel>
      {props.blockConfig?.meny && <H2GroupMenu underGrupper={underGrupper} />}
      <ContentStyle>
        <BlockContent blocks={props.children} />
      </ContentStyle>
    </StyledArticle>
  );

  return content;
}

export default withErrorBoundary(H2GroupMarkup, 'H2GroupMarkup');
