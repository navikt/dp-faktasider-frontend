import * as React from 'react';
import CustomComponent from './CustomComponent';
import { GtoNOK } from '../../utils/folketrygdensGrunnbeløp';
import { ReactNode } from 'react';
import ErrorBoundary from '../ErrorBoundary';
import H2GroupMarkup from './H2GroupMarkup';
import LinkMarkup from './Link';
import SanityBlockContent from '@sanity/block-content-to-react';
import H3GroupMarkup from './H3GroupMarkup';
import Video from './VideoMarkup';

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
    H2Group: H2GroupMarkup,
    H3Group: H3GroupMarkup,
    video: Video,
  },
  marks: {
    link: LinkMarkup,
    graaboks: () => 'hei',
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
