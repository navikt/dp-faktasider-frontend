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
import { ParsedRichText } from '../../utils/richTextUtils/parseRichText';
import FremhevetTekst from './FremhevetTekst';
import { UtkastInline } from './Utkast';
import VisForBlokk from './VisFor/VisForBlokk';
import VisForAnnotation from './VisFor/VisForAnnotation';

interface Props {
  blocks?: ParsedRichText;
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
    localeRichText: (props) => <BlockContent blocks={props.node} />,
    customComponent: CustomComponent,
    GtilNOK: (props) => GtoNOK(props.node.G),
    H2Group: H2GroupMarkup,
    H3Group: H3GroupMarkup,
    video: Video,
    fremhevetTekst: FremhevetTekst,
    visForBlokk: VisForBlokk,
  },
  marks: {
    link: LinkMarkup,
    utkast: UtkastInline,
    visForAnnotation: VisForAnnotation,
  },
};

function BlockContent(props: Props) {
  return (
    <ErrorBoundary boundaryName="BlockContent-serializer">
      <SanityBlockContent serializers={serializers} blocks={props.blocks} />
    </ErrorBoundary>
  );
}

export default BlockContent;
