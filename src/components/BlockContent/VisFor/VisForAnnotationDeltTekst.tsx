import * as React from "react";
import VisForAnnotation from "./VisForAnnotation";
import { VisForConfig } from "../../../utils/richTextUtils/richTextTypes";
import VisPaaSide from "./VisPaaSide";
import withErrorBoundary from "../../withErrorBoundary";
import { FaktasideQueryData } from "../../../hooks/groq/fetchFaktaside";

interface Props {
  children: string[];
  mark: {
    visFor?: VisForConfig;
    visPaaSider?: RawFaktasideData[];
  };
}

const VisForAnnotationDeltTekst = (props: Props) => {
  const visPaa = props.mark.visPaaSider?.map((side) => side.id);

  return (
    <VisPaaSide visPaaSider={visPaa}>
      <VisForAnnotation children={props.children} mark={{ visFor: props.mark.visFor }} />
    </VisPaaSide>
  );
};

export default withErrorBoundary(VisForAnnotationDeltTekst, "VisForAnnotationDeltTekst");
