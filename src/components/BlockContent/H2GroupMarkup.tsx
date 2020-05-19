import * as React from 'react';
import BlockContent from './BlockContent';
import styled, { css } from 'styled-components';
import { H2Group, isH3Group } from '../../utils/richTextUtils/richTextTypes';
import { theme } from '../../styles/theme';
import { Systemtittel } from 'nav-frontend-typografi';
import { idFromString } from '../../utils/routingUtils';
import H2GroupMenu from './H2GroupMenu';

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
  max-width: 100vw;
`;

const StyledSystemtittel = styled(Systemtittel)`
  margin-bottom: 2rem !important;
  text-align: center;
`;

function H2GroupMarkup(props: Props) {
  const id = idFromString(props.node.tittel);

  const titler = props.node.children.filter(isH3Group).map((h3Group) => h3Group.tittel);

  return (
    <StyledArticle background={!props.node.noBackground} aria-labeledby={id}>
      <StyledSystemtittel tag="h2" id={id} tabIndex={-1}>
        {props.node.tittel}
      </StyledSystemtittel>
      {props.node.meny && <H2GroupMenu menuItems={titler} />}
      <BlockContent blocks={props.node.children} />
    </StyledArticle>
  );
}

export default H2GroupMarkup;
