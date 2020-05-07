import * as React from 'react';
import SanityBlockContent from '@sanity/block-content-to-react';
import CustomComponent from './CustomComponent';
import { GtoNOK } from '../../utils/folketrygdensGrunnbeløp';
import { ReactNode } from 'react';

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
  },
};

function BlockContent(props: Props) {
  return <SanityBlockContent serializers={serializers} blocks={props.blocks} />;
}

export default BlockContent;
