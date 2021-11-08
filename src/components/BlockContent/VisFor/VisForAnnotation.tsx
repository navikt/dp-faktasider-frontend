import React from "react";
import VisFor from "./VisFor";
import { MarkDef } from "../../../utils/richTextUtils/richTextTypes";
import VisPaaSide from "./VisPaaSide";

interface Props {
  children: string[];
  mark: MarkDef;
}

export function VisForAnnotation(props: Props) {
  const visPaa = props.mark.visPaaSider?.map((side) => side._ref);
  const visForConfig = props.mark.visFor;

  return (
    <VisPaaSide visPaaSider={visPaa}>
      <VisFor inline={true} visForConfig={visForConfig}>
        {props.children}
      </VisFor>
    </VisPaaSide>
  );
}
