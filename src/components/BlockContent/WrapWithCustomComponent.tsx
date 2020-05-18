import * as React from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { SanityBlock } from '../../utils/richTextUtils/richTextTypes';
import GraaBoks from '../wrappers/GraaBoks';
import parseRichText from '../../utils/richTextUtils/parseRichText';
import BlockContent from './BlockContent';

interface Props {
  node: {
    component: string;
    tekst: SanityBlock[];
  };
}

function WrapWithCustomComponent(props: Props) {
  const parsedText = parseRichText(props.node.tekst);
  const component = props.node.component;

  switch (component) {
    case 'GråBoks':
      return (
        <GraaBoks>
          <BlockContent blocks={parsedText} />
        </GraaBoks>
      );
    default:
      return <AlertStripeFeil>Ukjent wrapper-komponent: "{component}"</AlertStripeFeil>;
  }
}

export default WrapWithCustomComponent;
