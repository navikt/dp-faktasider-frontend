import * as React from 'react';
import styled, { css } from 'styled-components/macro';
import { Group, isH3Group } from '../../../utils/richTextUtils/richTextTypes';
import { theme } from '../../../styles/theme';
import { Systemtittel } from 'nav-frontend-typografi';
import H2GroupMenu from './H2GroupMenu';
import withErrorBoundary from '../../withErrorBoundary';
import { useDekoratorPopdownOffset } from '../../../templates/faktaside/Navigasjonsmeny/useDekoratorPopdownOffset';
import CommonGroupMarkup from './CommonGroupMarkup';

const StyledArticle = (props: { noBackground?: boolean }) => styled.article`
  ${!props.noBackground &&
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

const StyledSystemtittel = (props: { offset: number; noBackground?: boolean }) => styled(Systemtittel).attrs({
  as: 'h2',
})`
  background-color: ${props.noBackground ? theme.colors.bakgrunn : '#fffe'};
  padding: 1rem;
  text-align: center;
  position: sticky !important;
  top: ${props.offset}px;
  z-index: 10;
`;

function H2GroupMarkup(props: Group) {
  const noBackground = props.blockConfig?.noBackground;
  const underGrupper = props.children.filter(isH3Group);
  const dekoratorOffset = useDekoratorPopdownOffset();

  return (
    <CommonGroupMarkup
      header={StyledSystemtittel({ offset: dekoratorOffset, noBackground })}
      region={StyledArticle({ noBackground })}
      group={props}
      beforeContent={props.blockConfig?.meny && <H2GroupMenu underGrupper={underGrupper} />}
    />
  );
}

export default withErrorBoundary(H2GroupMarkup, 'H2GroupMarkup');
