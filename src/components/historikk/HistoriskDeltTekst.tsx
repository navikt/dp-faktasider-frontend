import { Alert } from "@navikt/ds-react";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import SlideDown from "../SlideDown";
import { useHistorikkContext } from "./HistorikkContext";
import { SanityContent } from "../sanity-content/SanityContent";
import { loggHistorikk } from "../../utils/logging";

const Header = styled.p`
  font-weight: 600;
  margin: 0 !important;
`;

const StyledAlerstripeInfo = styled(Alert).attrs({ variant: "info" })`
  & + & {
    margin-top: 1rem;
  }
`;

const IdStyle = styled.p`
  opacity: 0.7;
  font-size: 0.8rem;
  margin-top: 0 !important;
`;

//TODO fix props type. Props type inferred from usage temporarily
export function HistoriskDeltTekst(props: { node: { deltTekst: { _ref: string } } }) {
  const documentId = props.node.deltTekst._ref;
  const historikkContext = useHistorikkContext();
  const href = `/historikk/${documentId}/${historikkContext.requestTimestamp || ""}`;

  return (
    <StyledAlerstripeInfo>
      <Header>Her var det en delt tekst</Header>
      <IdStyle>Id: {documentId}</IdStyle>
      <p>
        <Link href={href} passHref>
          <a className="lenke" target="_blank">
            Se versjonshistorikk for den delte teksten (åpnes i ny fane)
          </a>
        </Link>
      </p>
      <SlideDown title="Hva er en delt tekst?" onClick={() => loggHistorikk('Åpner "Hva er en delt tekst?"')}>
        <SanityContent blocks={historikkContext.hjelpeTekster?.deltTekstForklaring} />
      </SlideDown>
    </StyledAlerstripeInfo>
  );
}
