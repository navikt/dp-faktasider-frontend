import * as React from "react";
import styled from "styled-components/macro";
import { Innholdstittel, Normaltekst } from "nav-frontend-typografi";
import { useTranslation } from "react-i18next";
import { supportedLanguages } from "../../i18n/supportedLanguages";
import withErrorBoundary from "../../components/withErrorBoundary";
import { useMount } from "react-use";
import { loggIkkeOversatt } from "../../utils/logging";
import Link from "next/link";
import { FaktasideProps } from "./Faktaside";
import SEO from "../SEO";

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

const StyledNormaltekst = styled(Normaltekst)`
  margin: 2rem 0 0 !important;
`;

function IkkeOversatt(props: FaktasideProps) {
  const page = props;
  const { t } = useTranslation("global");
  const title = page.title || "";

  useMount(() => loggIkkeOversatt(title));

  const oversettelser = supportedLanguages.map((lang) => {
    const publisert = page.visSprakversjon?.[lang];
    if (!publisert) {
      return null;
    }
    const tittel = page.rawData?.faktaside.title?.[lang];
    return (
      <li>
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
      <SEO title={title} description={props.beskrivelse || ""} seoImage={props.rawData.oppsett.seoImage} />
      <Innholdstittel>{t("ikkeOversatt")}</Innholdstittel>
      {oversettelser.length && (
        <>
          <StyledNormaltekst>{t("tilgjengeligPåAndreSpråk")}</StyledNormaltekst>
          <StyledUl>{oversettelser}</StyledUl>
        </>
      )}
    </Style>
  );
}

export default withErrorBoundary(IkkeOversatt, "IkkeOversatt");
