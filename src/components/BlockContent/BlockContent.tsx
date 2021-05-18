import * as React from "react";
import { ReactNode } from "react";
import CustomComponent from "./CustomComponent";
import LinkMarkup from "./Link";
import SanityBlockContent from "@sanity/block-content-to-react";
import Video from "./VideoMarkup";
import { ParsedRichText } from "../../utils/richTextUtils/parser/parseRichText";
import FremhevetTekst from "./FremhevetTekst";
import { UtkastInline } from "./utkast/Utkast";
import VisForAnnotation from "./VisFor/VisForAnnotation";
import GroupMarkup from "./GroupMarkup/GroupMarkup";
import withErrorBoundary from "../withErrorBoundary";
import Tilleggsinnformasjon from "./Tilleggsinnformasjon/TilleggsInnformasjon";
import ListItemRenderer from "./ListItemRenderer";
import GtilNOKAnnotation from "./GtilNOKAnnotation";
import Tidslinje from "./Tidslinje/Tidslinje";
import { HistoriskDeltTekst } from "../historikk/HistoriskDeltTekst";

interface Props {
  blocks?: ParsedRichText;
}

type Serializers = {
  types: {
    [key: string]: ({ node: Block }) => ReactNode;
  };
  marks: {
    [key: string]: any;
  };
  listItem: ({ node: Block }) => ReactNode;
};

const serializers: Serializers = {
  types: {
    group: GroupMarkup,
    customComponent: CustomComponent,
    video: Video,
    fremhevetTekst: FremhevetTekst,
    tileggsInformasjon: Tilleggsinnformasjon,
    tidslinje: Tidslinje,
    historiskDeltTekst: HistoriskDeltTekst,
  },
  listItem: ListItemRenderer,
  marks: {
    link: LinkMarkup,
    utkast: UtkastInline,
    GtilNOK: GtilNOKAnnotation,
    visForAnnotation: VisForAnnotation,
  },
};

function BlockContent(props: Props) {
  return <SanityBlockContent serializers={serializers} blocks={props.blocks || []} />;
}

export default withErrorBoundary(BlockContent, "BlockContent");
