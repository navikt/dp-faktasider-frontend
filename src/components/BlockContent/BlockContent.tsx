import * as React from 'react';
import SanityBlockContent from '@sanity/block-content-to-react';
import CustomComponent from './CustomComponent';
import { GtoNOK } from '../../utils/folketrygdensGrunnbeløp';

interface Props {
  blocks: any;
}

const serializers = {
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
