import * as React from "react";
import withErrorBoundary from "../withErrorBoundary";
import { useEffect } from "react";
import { loggError } from "../../utils/logging";
import { useGrunnbellop } from "../../utils/folketrygdensGrunnbeløp";
import { useDevContext } from "../DevKnapper/DevContext";
import styled from "styled-components";
import { useHistorikkContext } from "../historikk/HistorikkContext";

interface Props {
  children: string[];
}

const GtoNokDebug = styled.span`
  box-shadow: 0 0 0 0.2rem limegreen;
`;

const GtilNOKAnnotation = (props: Props) => {
  const G = props.children.join("");
  const notNumber = isNaN(Number(G));
  const { GtoNOK } = useGrunnbellop();
  const devContext = useDevContext();
  const historikkContext = useHistorikkContext();

  useEffect(() => {
    notNumber &&
      loggError(new Error("Kunne ikke konvertere belløp til NOK"), { grunnbellop: G, children: props.children });
  }, [notNumber, G, props.children]);

  if (notNumber) {
    return <>{G} (G)</>;
  }

  const g = parseFloat(G);

  if (devContext.value.debugGronnbellop) {
    return (
      <GtoNokDebug>
        {g} G = {GtoNOK(g)}
      </GtoNokDebug>
    );
  }

  if (historikkContext.isHistorikk) {
    return (
      <GtoNokDebug>
        {g} G = {GtoNOK(g)}
      </GtoNokDebug>
    );
  }

  return <>{GtoNOK(g)}</>;
};

export default withErrorBoundary(GtilNOKAnnotation, "GtilNOKAnnotation");
