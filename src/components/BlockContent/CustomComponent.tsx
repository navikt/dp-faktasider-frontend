import * as React from "react";
import { AlertStripeAdvarsel, AlertStripeFeil } from "nav-frontend-alertstriper";
import DagpengerKalkulator from "../HvorMyeKalkulator/DagpengerKalkulator";
import DagpengerKalkulatorLRling from "../HvorMyeKalkulator/DagpengerKalkulatorLærling";
import withErrorBoundary from "../withErrorBoundary";
import { useHistorikkContext } from "../historikk/HistorikkContext";

interface Props {
  node: {
    komponent: string;
  };
}

function CustomComponent(props: Props) {
  const historikkContext = useHistorikkContext();

  if (historikkContext.isHistorikk)
    return <AlertStripeAdvarsel>Her var det en spesialkomponent ved navn: ${props.node.komponent}</AlertStripeAdvarsel>;
  switch (props.node.komponent) {
    case "DagpengeKalkulator - normal":
      return <DagpengerKalkulator />;
    case "DagpengeKalkulator - lærling":
      return <DagpengerKalkulatorLRling />;
    default:
      return <AlertStripeFeil>Ukjent komponent: "{props.node.komponent}"</AlertStripeFeil>;
  }
}

export default withErrorBoundary(CustomComponent, "CustomComponent");
