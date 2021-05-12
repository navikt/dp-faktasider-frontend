import { AlertStripeAdvarsel } from "nav-frontend-alertstriper";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import SlideDown from "../SlideDown";
import { useHistorikkContext } from "./HistorikkContext";

const Header = styled.p`
  font-weight: 600;
  margin-top: 0 !important;
`;

export function HistoriskDeltTekst(props) {
  const documentId = props.node.deltTekst._ref;
  const timestamp = useHistorikkContext().timestamp || "";
  const href = `/historikk/${documentId}/${timestamp}`;

  return (
    <AlertStripeAdvarsel>
      <Header>Beklager, vi klarer ikke å hente teksten som var her</Header>
      <p>
        <Link href={href} passHref>
          <a className="lenke">Trykk her for å se versjonshistorikk av denne teksten</a>
        </Link>
      </p>
      <SlideDown title="Hvorfor kan dere ikke vise denne teksten?">
        <p>
          På informasjonssidene våre har vi en del tekster som går igjen på flere sider. Disse tekstene kaller vi for
          "delte tekster".
        </p>
        <p>
          På live-sidene våre trekker vi automatisk inn de delte tekstene, og for bruker oppleves det som en
          sammenhengende side. Da slipper brukeren å navigere mellom flere sider og sy sammen innholdet selv. Dette
          skjer dessverre ikke når vi viser historiske versjoner av sidene.
        </p>
        <p>
          De delte tekstene blir oppdatert uavhengig av informasjonssidene og har derfor sin egen versjonshistorikk.
        </p>
      </SlideDown>
    </AlertStripeAdvarsel>
  );
}
