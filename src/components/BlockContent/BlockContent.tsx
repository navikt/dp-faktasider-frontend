import * as React from 'react';
import CustomComponent from './CustomComponent';
import { GtoNOK } from '../../utils/folketrygdensGrunnbeløp';
import { ReactNode } from 'react';
import ErrorBoundary from '../ErrorBoundary';
import BolkMarkup from './BolkMarkup';
import LinkMarkup from './Link';
import SanityBlockContent from '@sanity/block-content-to-react';
import AvsnittMarkup from './AvsnittMarkup';

interface Props {
  blocks: any;
}

type Serializers = {
  types: {
    [key: string]: ({ node: any }) => ReactNode;
  };
  marks: {
    [key: string]: any;
  };
};

const serializers: Serializers = {
  types: {
    localeRichText: (props) => <BlockContent blocks={props.node.nb} />,
    customComponent: CustomComponent,
    GtoNOK: (props) => GtoNOK(props.node.GtoNOK),
    bolk: BolkMarkup,
    avsnitt: AvsnittMarkup,
  },
  marks: {
    link: LinkMarkup,
  },
};

function BlockContent(props: Props) {
  return (
    <ErrorBoundary>
      <SanityBlockContent serializers={serializers} blocks={props.blocks} />
    </ErrorBoundary>
  );
}

export default BlockContent;
