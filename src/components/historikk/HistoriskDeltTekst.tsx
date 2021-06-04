import { AlertStripeInfo } from "nav-frontend-alertstriper";
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
    <AlertStripeInfo>
      <Header>Her var det en delt tekst</Header>
      <p>
        <Link href={href} passHref>
          <a className="lenke">Se versjonshistorikk for den delte teksten</a>
        </Link>
      </p>
      <SlideDown title="Hvorfor vises ikke denne teksten her?">
        <BlockContent blocks={historikkContext.hjelpeTekster?.deltTekstForklaring} />
      </SlideDown>
    </AlertStripeInfo>
  );
}
