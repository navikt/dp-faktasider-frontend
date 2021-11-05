import React, { ReactNode } from "react";
import CustomComponent from "../BlockContent/CustomComponent";
import LinkMarkup from "../BlockContent/Link";
import Video from "../BlockContent/VideoMarkup";
import FremhevetTekst from "../BlockContent/FremhevetTekst";
import { Draft } from "../BlockContent/draft/Draft";
import VisForAnnotation from "../BlockContent/VisFor/VisForAnnotation";
import GroupMarkup from "../BlockContent/GroupMarkup/GroupMarkup";
import { withErrorBoundary } from "../withErrorBoundary";
import Tilleggsinnformasjon from "../BlockContent/Tilleggsinnformasjon/TilleggsInnformasjon";
import ListItemRenderer from "../BlockContent/ListItemRenderer";
import GtilNOKAnnotation from "../BlockContent/GtilNOKAnnotation/GtilNOKAnnotation";
import Tidslinje from "../BlockContent/Tidslinje/Tidslinje";
import { HistoriskDeltTekst } from "../historikk/HistoriskDeltTekst";
import { Block } from "../../utils/richTextUtils/richTextTypes";
import styles from "./SanityContent.module.scss";

// https://github.com/sanity-io/block-content-to-react/issues/26
// @ts-ignore
import SanityBlockContent from "@sanity/block-content-to-react";

interface Props {
  blocks?: Block[];
}

type Serializers = {
  // TODO fix types for sanity
  // @ts-ignore
  types: { [key: string]: ({ node: Block }) => ReactNode };
  marks: {
    [key: string]: unknown;
  };
  // TODO fix types for sanity
  // @ts-ignore
  listItem: ({ node: Block }) => ReactNode;
};

const serializers: Serializers = {
  types: {
    group: GroupMarkup,
    customComponent: CustomComponent,
    video: Video,
    fremhevetTekst: FremhevetTekst,
    deltFremhevetTekst: FremhevetTekst, // Må være her for at historisk visning skal funke
    tileggsInformasjon: Tilleggsinnformasjon,
    tidslinje: Tidslinje,
    historiskDeltTekst: HistoriskDeltTekst,
  },
  listItem: ListItemRenderer,
  marks: {
    link: LinkMarkup,
    utkast: (props: unknown) => <Draft inline={true} {...props} />,
    GtilNOK: GtilNOKAnnotation,
    visForAnnotation: VisForAnnotation,
    strykes: (props) => <>{props.children}</>,
  },
};

function SanityContentComponent(props: Props) {
  return (
    <div className={styles.container}>
      <SanityBlockContent serializers={serializers} blocks={props.blocks || []} />
    </div>
  );
}

export const SanityContent = withErrorBoundary(SanityContentComponent, "SanityContent");
