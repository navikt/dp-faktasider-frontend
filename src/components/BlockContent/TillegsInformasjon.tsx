import * as React from 'react';
import styled from 'styled-components';
import BlockContent from './BlockContent';
import { SanityBlock } from '../../utils/richTextUtils/richTextTypes';
import parseRichText from '../../utils/richTextUtils/parser/parseRichText';
import withErrorBoundary from '../withErrorBoundary';
import SlideDown from '../SlideDown';

interface Props {
  node: {
    innhold: SanityBlock[];
    title: string;
  };
}

const Style = styled.div``;

function Tilleggsinnformasjon(props: Props) {
  const parsedText = parseRichText(props.node.innhold);

  return (
    <Style>
      <SlideDown title={props.node.title}>
        <BlockContent blocks={parsedText} />
      </SlideDown>
    </Style>
  );
}

export default withErrorBoundary(Tilleggsinnformasjon, 'Tilleggsinnformasjon');
