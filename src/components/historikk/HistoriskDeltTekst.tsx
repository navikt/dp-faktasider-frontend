import { AlertStripeInfo } from "nav-frontend-alertstriper";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Header = styled.p`
  font-weight: 600;
`;

export function HistoriskDeltTekst(props) {
  const lenke = `/historikk/${props.node.deltTekst._ref}`;
  console.log(props);
  return (
    <AlertStripeInfo>
      <Header>Her var det en delt tekst. </Header>
      <p>
        Vi greier ikke å vise den automatisk i det historiske dokumentet, men du kan utforske{" "}
        <Link href={lenke} passHref>
          <a className="lenke">versjonshistorikk av den delte teksten</a>
        </Link>
      </p>
    </AlertStripeInfo>
  );
}
