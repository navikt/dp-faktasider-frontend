import * as React from 'react';
import styled, { css } from 'styled-components/macro';
import { Group, isH3Group } from '../../../utils/richTextUtils/richTextTypes';
import { theme } from '../../../styles/theme';
import { Systemtittel } from 'nav-frontend-typografi';
import H2GroupMenu from './H2GroupMenu';
import withErrorBoundary from '../../withErrorBoundary';
import { useDekoratorPopdownOffset } from '../../../templates/faktaside/Navigasjonsmeny/useDekoratorPopdownOffset';
import CommonGroupMarkup from './CommonGroupMarkup';

type RegionProps = { noBackground?: boolean };

const StyledArticle = styled.article<RegionProps>`
  ${(props) =>
    !props.noBackground &&
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

type TittelProps = { dekoratorOffset: number; noBackground?: boolean };

const StyledSystemtittel = styled(Systemtittel).attrs({
  as: 'h2',
})<TittelProps>`
  background-color: ${(props) => (props.noBackground ? theme.colors.bakgrunn : '#fffe')};
  padding: 1rem;
  text-align: center;
  position: sticky !important;
  top: ${(props) => props.dekoratorOffset}px;
  z-index: 10;
  margin-bottom: 1.5rem;
`;

function H2GroupMarkup(props: Group) {
  const noBackground = props.blockConfig?.noBackground;
  const underGrupper = props.children.filter(isH3Group);
  const dekoratorOffset = useDekoratorPopdownOffset();

  const headerProps: TittelProps = { noBackground, dekoratorOffset };
  const regionProps: RegionProps = { noBackground };

  return (
    <CommonGroupMarkup
      header={StyledSystemtittel}
      headerProps={headerProps}
      region={StyledArticle}
      regionProps={regionProps}
      group={props}
      beforeContent={props.blockConfig?.meny && <H2GroupMenu title={props.title} underGrupper={underGrupper} />}
    />
  );
}

export default withErrorBoundary(H2GroupMarkup, 'H2GroupMarkup');
