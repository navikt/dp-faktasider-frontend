import React, { useEffect } from "react";
import { Link } from "@navikt/ds-react";
import * as Sentry from "@sentry/nextjs";
import styled from "styled-components";
import { loggHistorikk } from "../../../utils/logging";
import { useGrunnbellop } from "../../../utils/folketrygdensGrunnbeløp";
import { useDevContext } from "../../DevKnapper/DevContext";
import { useHistorikkContext } from "../../historikk/HistorikkContext";
import Hjelpetekst from "../../historikk/Hjelpetekst";

interface Props {
  children: string[];
}

const GtoNokDebug = styled.span`
  box-shadow: 0 0 0 0.2rem limegreen;
`;

const HistorikkStyle = styled.abbr`
  border-bottom: 0.2rem limegreen dashed;
`;

export function GtilNOKAnnotation(props: Props) {
  const G = props.children.join("");
  const notNumber = isNaN(Number(G));
  const { GtoNOK } = useGrunnbellop();
  const devContext = useDevContext();
  const historikkContext = useHistorikkContext();

  useEffect(() => {
    if (notNumber) {
      Sentry.captureException(new Error(`Kunne ikke konvertere "${G}" til NOK`));
    }
  }, [notNumber]);

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
      <HistorikkStyle>
        {g} G{" "}
        <Hjelpetekst tittel="Grunnbelløp, hjelp" onClick={() => loggHistorikk("Viser hjelpetekst for grunnbelløp")}>
          G-beløpet her var oversatt til kroner.{" "}
          <Link href="https://www.nav.no/no/nav-og-samfunn/kontakt-nav/utbetalinger/grunnbelopet-i-folketrygden">
            Du kan se historisk verdi av g-beløp her.
          </Link>
        </Hjelpetekst>
      </HistorikkStyle>
    );
  }

  return <>{GtoNOK(g)}</>;
}
