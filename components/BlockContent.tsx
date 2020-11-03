import * as React from 'react';
import { ReactNode } from 'react';
import SanityBlockContent from '@sanity/block-content-to-react';
import { GtilNOKPeview } from '../schemas/richText/GtilNOKPreview';
import FremhevetTekst from '../schemas/fremhevetTekst/FremhevetTekst';
import withErrorBoundary from './withErrorBoundary';
import CustomComponentPreview from '../schemas/richText/CustomComponentPreview';
import TillegsInfo from '../schemas/tillegsinfo/TillegsInfo';
import { InlineUtkast } from '../schemas/richText/Utkast';
import VideoPreview from '../schemas/video/VideoPreview';
import { InlineVisForPreview } from '../schemas/richText/VisForPreview';
import { H2Header, H3Header, H2NoBackround, H2HeaderMMeny, H4Header } from '../schemas/richText/HeaderPreviews';
import TidslinjePreview, { TidslinjePunkt } from '../schemas/tidslinje/TidslinjePreview';

type Serializers = {
  types: {
    [key: string]: ({ node: any }) => ReactNode;
  };
  marks: {
    [key: string]: any;
  };
};

const BlockRenderer = (props) => {
  const { style = 'normal' } = props.node;

  switch (style) {
    case 'h2':
      return <H2Header {...props} />;
    case 'h2-m-meny':
      return <H2HeaderMMeny {...props} />;
    case 'h2-no-background':
      return <H2NoBackround {...props} />;
    case 'h3':
      return <H3Header {...props} />;
    case 'h4':
      return <H4Header {...props} />;
    case 'tidslinjepunkt':
      return <TidslinjePunkt {...props} />;
    default:
      return SanityBlockContent.defaultSerializers.types.block(props);
  }
};

const serializers: Serializers = {
  types: {
    deltFremhevetTekst: (props) => <FremhevetTekst blocks={props.node.innhold} />,
    customComponent: (props) => <CustomComponentPreview name={props.node.komponent} />,
    tileggsInformasjon: (props) => <TillegsInfo title={props.node.title} blocks={props.node.innhold} />,
    video: (props) => <VideoPreview name={props.node.title} url={props.node.url} />,
    block: BlockRenderer,
    tidslinje: (props) => <TidslinjePreview blocks={props.node.innhold} />,
  },
  marks: {
    GtilNOK: (props) => <GtilNOKPeview {...props} grunnbelløp={props.children.join('')} />,
    utkast: InlineUtkast,
    visForAnnotation: (props) => <InlineVisForPreview visFor={props.mark.visFor} {...props} />,
    visForAnnotationDeltTekst: (props) => (
      <InlineVisForPreview visPaaSider={props.mark.visPaaSider} visFor={props.mark.visFor} {...props} />
    ),
  },
};

function BlockContent(props: { blocks: any }) {
  return <SanityBlockContent blocks={props.blocks} serializers={serializers} />;
}

export default withErrorBoundary(BlockContent);
