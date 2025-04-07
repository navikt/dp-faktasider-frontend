import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
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

export function SistOppdatert() {
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
