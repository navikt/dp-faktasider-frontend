import * as React from 'react';
import { useReducer, useRef } from 'react';
import styled, { css } from 'styled-components';
import BlockContent from './BlockContent';
import { SanityBlock } from '../../utils/richTextUtils/richTextTypes';
import parseRichText from '../../utils/richTextUtils/parser/parseRichText';
import withErrorBoundary from '../withErrorBoundary';
import ChevronButton from '../ChevronButton';
import { guid } from 'nav-frontend-js-utils';
import { Element } from 'nav-frontend-typografi';

interface Props {
  node: {
    innhold: SanityBlock[];
    title: string;
  };
}

const asideBorder = 'solid 1px #bbb8';

const StyledAside = styled.aside`
  border-top: ${asideBorder};
  border-bottom: ${asideBorder};
  padding: 1.5rem 0.5rem;
`;

const Content = styled.div<{ open: boolean }>`
  margin: 0.5rem 0;
  position: relative;
  overflow: hidden;
  ${(props) =>
    !props.open &&
    css`
      max-height: 3rem;
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 3rem;
        background: linear-gradient(transparent, white);
      }
    `}
`;

function Tilleggsinnformasjon(props: Props) {
  const parsedText = parseRichText(props.node.innhold);
  const [open, toggle] = useReducer((state) => !state, false);
  const id = useRef(guid()).current;

  return (
    <StyledAside aria-labelledby={id}>
      <Element tag="h4" id={id}>
        {props.node.title}
      </Element>
      <Content open={open}>
        <BlockContent blocks={parsedText} />
      </Content>
      <ChevronButton aria-hidden={true} className="lenke" open={open} title="Vis mer" onClick={toggle} />
    </StyledAside>
  );
}

export default withErrorBoundary(Tilleggsinnformasjon, 'Tilleggsinnformasjon');
