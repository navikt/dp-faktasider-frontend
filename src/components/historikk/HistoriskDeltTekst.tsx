import { AlertStripeAdvarsel } from "nav-frontend-alertstriper";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import SlideDown from "../SlideDown";
import { useHistorikkContext } from "./HistorikkContext";
import BlockContent from "../BlockContent/BlockContent";

const Header = styled.p`
  font-weight: 600;
  margin-top: 0 !important;
`;

export function HistoriskDeltTekst(props) {
  const documentId = props.node.deltTekst._ref;
  const historikkContext = useHistorikkContext();
  const href = `/historikk/${documentId}/${historikkContext.timestamp || ""}`;

  return (
    <AlertStripeAdvarsel>
      <Header>Beklager, vi klarer ikke å hente teksten som var her</Header>
      <p>
        <Link href={href} passHref>
          <a className="lenke">Trykk her for å se versjonshistorikk av denne teksten</a>
        </Link>
      </p>
      <SlideDown title="Hvorfor kan dere ikke vise denne teksten?">
        <BlockContent blocks={historikkContext.hjelpeTekster?.deltTekstForklaring} />
      </SlideDown>
    </AlertStripeAdvarsel>
  );
}
