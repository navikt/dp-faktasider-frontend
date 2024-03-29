import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { supportedLanguages } from "../../i18n/supportedLanguages";
import { useMount } from "react-use";
import { loggIkkeOversatt } from "../../utils/logging";
import Link from "next/link";
import { SEO } from "../SEO";
import { BodyShort, Heading } from "@navikt/ds-react";
import { FaktasideContext } from "./FaktaSideContext";

const Style = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  min-height: 30vh;
`;

const StyledUl = styled.ul`
  list-style: none !important;
`;

//todo: må gjøre noe slik at ratioene blir større igjen i forhold til designsystemet? tittel er 36px burde være 40px
const StyledBodyShort = styled(BodyShort)`
  margin: 2rem 0 0 !important;
`;

export function IkkeOversatt(props: FaktasideContext) {
  const page = props;
  const { t } = useTranslation("global");
  const title = page.title || "";

  useMount(() => loggIkkeOversatt(title));

  const oversettelser = supportedLanguages.map((lang) => {
    const publisert = page.visSprakversjon?.[lang];
    if (!publisert) {
      return null;
    }
    const tittel = page.rawData?.faktaside?.title?.[lang];
    return (
      <li key={page.slug}>
        <Link href={`/${page.slug}`} locale={lang}>
          <a>
            {tittel} - ({t(lang)})
          </a>
        </Link>
      </li>
    );
  });

  return (
    <Style>
      <SEO
        title={title}
        description={props.beskrivelse || ""}
        seoImage={props.rawData.oppsett.seoImage}
        path={`/${props.slug}`}
      />
      <Heading size="xlarge" spacing level="1">
        {t("ikkeOversatt")}
      </Heading>
      {oversettelser.length && (
        <>
          <StyledBodyShort>{t("tilgjengeligPåAndreSpråk")}</StyledBodyShort>
          <StyledUl>{oversettelser}</StyledUl>
        </>
      )}
    </Style>
  );
}
