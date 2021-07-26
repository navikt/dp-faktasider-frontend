import styled from "styled-components/macro";
import React from "react";
import { useTranslation } from "react-i18next";
import withErrorBoundary from "../../withErrorBoundary";
import Link from "next/link";
import { useFaktasideContext } from "../FaktaSideContext";

const Style = styled.div`
  margin-top: 0.5rem;
  font-style: italic;
  opacity: 0.8;
`;

const Lenke = styled.a`
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

function SistOppdatert() {
  const { t } = useTranslation("global");
  const faktaside = useFaktasideContext();

  if (!faktaside.publiseringsTidspunkt) {
    return null;
  }

  const tekst = t("sistOppdatert", { publiseringstidspunkt: new Date(faktaside.publiseringsTidspunkt) });
  return (
    <Style>
      <Link href={`/historikk/${faktaside.id}/${faktaside.publiseringsTidspunkt}`} passHref>
        <Lenke rel="nofollow">{tekst}</Lenke>
      </Link>
    </Style>
  );
}

export default withErrorBoundary(SistOppdatert, "SistOppdatert");
