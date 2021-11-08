import React from "react";
import { Alert } from "@navikt/ds-react";
import DagpengerKalkulator from "../HvorMyeKalkulator/DagpengerKalkulator";
import DagpengerKalkulatorLRling from "../HvorMyeKalkulator/DagpengerKalkulatorLærling";
import { useHistorikkContext } from "../historikk/HistorikkContext";

interface Props {
  node: {
    komponent: string;
  };
}

export function CustomComponent(props: Props) {
  const historikkContext = useHistorikkContext();

  if (historikkContext.isHistorikk)
    return <Alert variant="warning">Her var det en spesialkomponent ved navn: {props.node.komponent}</Alert>;
  switch (props.node.komponent) {
    case "DagpengeKalkulator - normal":
      return <DagpengerKalkulator />;
    case "DagpengeKalkulator - lærling":
      return <DagpengerKalkulatorLRling />;
    default:
      return <Alert variant="error">Ukjent komponent: `&quot;`{props.node.komponent}`&quot;`</Alert>;
  }
}
