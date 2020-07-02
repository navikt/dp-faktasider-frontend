import * as React from 'react';
import BlockContent from '../BlockContent';
import styled, { css } from 'styled-components/macro';
import { Group, isH3Group } from '../../../utils/richTextUtils/richTextTypes';
import { theme } from '../../../styles/theme';
import { Systemtittel } from 'nav-frontend-typografi';
import H2GroupMenu from './H2GroupMenu';
import withErrorBoundary from '../../withErrorBoundary';
import { useGroupMarkupAriaProps } from './useGroupMarkupAriaProps';
import Anchor from '../../Anchor';
import HashLink from '../../HashLink';
import { useDekoratorPopdownOffset } from '../../../templates/faktaside/Navigasjonsmeny/useDekoratorPopdownOffset';

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

const StyledSystemtittel = styled(Systemtittel)<{ offset: number }>`
  text-align: center;
  position: sticky !important;
  top: ${(props) => props.offset}px;
  z-index: 10;
`;

const BackgroundColor = styled.div<{ noBackground?: boolean }>`
  background-color: ${(props) => (props.noBackground ? theme.colors.bakgrunn : '#fffe')};
  padding: 0.5rem;
`;

const ContentStyle = styled.div`
  margin-top: 1.5rem;
`;

function H2GroupMarkup(props: Group) {
  const { regionProps, headerProps, id } = useGroupMarkupAriaProps(props);
  const noBackground = props.blockConfig?.noBackground;
  const underGrupper = props.children.filter(isH3Group);
  const dekoratorOffset = useDekoratorPopdownOffset();

  return (
    <StyledArticle background={!noBackground} {...regionProps}>
      <Anchor id={id} focusOnParent={true} />
      <StyledSystemtittel tag="h2" {...headerProps} offset={dekoratorOffset}>
        <BackgroundColor noBackground={noBackground}>
          <HashLink id={id} ariaLabel={`Lenke til ${props.title}`} />
          {props.title}
        </BackgroundColor>
      </StyledSystemtittel>
      {props.blockConfig?.meny && <H2GroupMenu underGrupper={underGrupper} />}
      <ContentStyle>
        <BlockContent blocks={props.children} />
      </ContentStyle>
    </StyledArticle>
  );
}

export default withErrorBoundary(H2GroupMarkup, 'H2GroupMarkup');
