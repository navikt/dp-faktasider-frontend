import * as React from 'react';
import SanityBlockContent from '@sanity/block-content-to-react';
import CustomComponent from './CustomComponent';
import { GtoNOK } from '../../utils/folketrygdensGrunnbeløp';
import { ReactNode } from 'react';
import ErrorBoundary from '../ErrorBoundary';
import Bolk from './Bolk';

interface Props {
  blocks: any;
}

type Serializers = {
  types: {
    [key: string]: ({ node: any }) => ReactNode;
  };
};

const serializers: Serializers = {
  types: {
    localeRichText: (props) => <BlockContent blocks={props.node.nb} />,
    customComponent: CustomComponent,
    GtoNOK: (props) => GtoNOK(props.node.GtoNOK),
    bolk: Bolk,
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
