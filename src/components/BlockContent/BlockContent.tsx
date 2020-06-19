import * as React from 'react';
import { ReactNode } from 'react';
import CustomComponent from './CustomComponent';
import { GtoNOK } from '../../utils/folketrygdensGrunnbeløp';
import ErrorBoundary from '../ErrorBoundary';
import LinkMarkup from './Link';
import SanityBlockContent from '@sanity/block-content-to-react';
import Video from './VideoMarkup';
import { ParsedRichText } from '../../utils/richTextUtils/parseRichText';
import FremhevetTekst from './FremhevetTekst';
import { UtkastInline } from './Utkast';
import VisForAnnotation from './VisFor/VisForAnnotation';
import GroupMarkup from './GroupMarkup';

interface Props {
  blocks: ParsedRichText;
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
    group: GroupMarkup,
    customComponent: CustomComponent,
    GtilNOK: (props) => GtoNOK(props.node.G),
    video: Video,
    fremhevetTekst: FremhevetTekst,
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
