import { AlertStripeAdvarsel } from "nav-frontend-alertstriper";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import SlideDown from "../SlideDown";

const Header = styled.p`
  font-weight: 600;
  margin-top: 0 !important;
`;

export function HistoriskDeltTekst(props) {
  let documentId = props.node.deltTekst._ref;
  const href = `/historikk/${documentId}`;

  return (
    <AlertStripeAdvarsel>
      <Header>Her var det en delt tekst.</Header>
      <p>
        <Link href={href} passHref>
          <a className="lenke">Gå til versjonshistorikk for den delte teksten</a>
        </Link>
      </p>
      <SlideDown title="Hva er en delt tekst?">
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
