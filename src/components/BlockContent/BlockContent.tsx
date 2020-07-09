import * as React from 'react';
import { ReactNode } from 'react';
import CustomComponent from './CustomComponent';
import { GtoNOK } from '../../utils/folketrygdensGrunnbeløp';
import LinkMarkup from './Link';
import SanityBlockContent from '@sanity/block-content-to-react';
import Video from './VideoMarkup';
import { ParsedRichText } from '../../utils/richTextUtils/parser/parseRichText';
import FremhevetTekst from './FremhevetTekst';
import { UtkastInline } from './Utkast';
import VisForAnnotation from './VisFor/VisForAnnotation';
import GroupMarkup from './GroupMarkup/GroupMarkup';
import VisForAnnotationDeltTekst from './VisFor/VisForAnnotationDeltTekst';
import withErrorBoundary from '../withErrorBoundary';

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
    visForAnnotationDeltTekst: VisForAnnotationDeltTekst,
  },
};

function BlockContent(props: Props) {
  return <SanityBlockContent serializers={serializers} blocks={props.blocks} />;
}

export default withErrorBoundary(BlockContent);
