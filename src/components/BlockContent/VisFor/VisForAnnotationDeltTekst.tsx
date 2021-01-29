import * as React from "react";
import VisForAnnotation from "./VisForAnnotation";
import { MarkDef } from "../../../utils/richTextUtils/richTextTypes";
import VisPaaSide from "./VisPaaSide";
import withErrorBoundary from "../../withErrorBoundary";

interface Props {
  children: string[];
  mark: MarkDef;
}

const VisForAnnotationDeltTekst = (props: Props) => {
  const visPaa = props.mark.visPaaSider?.map((side) => side._ref);

  return (
    <VisPaaSide visPaaSider={visPaa}>
      <VisForAnnotation children={props.children} mark={{ visFor: props.mark.visFor }} />
    </VisPaaSide>
  );
};

export default withErrorBoundary(VisForAnnotationDeltTekst, "VisForAnnotationDeltTekst");
