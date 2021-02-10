import React from "react";
import SEO from "../components/SEO";
import styled from "styled-components/macro";
import { Normaltekst, Sidetittel, Undertittel } from "nav-frontend-typografi";
import { useTranslation } from "react-i18next";
import { useMount } from "react-use";
import { loggNotFound } from "../utils/logging";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import SideListe from "../components/faktaside/Meny/SideListe";
import { sanityClient } from "../sanity/sanity-config";
import { menuQuery, MenuQueryData } from "../sanity/groq/menu/menuQuery";
import { parseMenuData } from "../sanity/groq/menu/parseMenuData";
import useBreadcrumbs from "../components/faktaside/useBreadcrumbs";
import localizeSanityContent from "../i18n/localizeSanityContent";
import { SupportedLanguage } from "../i18n/supportedLanguages";
import Link from "next/link";

const Style = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 60vh;
  > * {
    max-width: 30rem;
  }
`;

const StyledNormaltekst = styled(Undertittel)`
  margin-bottom: 1rem !important;
`;

const TilbakeTilForsidelenke = styled.a`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 2rem 0;
  padding: 0.5rem;
`;

interface Props {
  menuData: MenuQueryData;
  domeneTittel: string;
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const menuData: MenuQueryData = await sanityClient.fetch(menuQuery);
  const domeneTittel = await sanityClient.fetch(`*[_id == "oppsett"][0].title`);

  return {
    props: {
      menuData,
      domeneTittel,
    },
  };
};

const NotFoundPage = (props: Props) => {
  const { t } = useTranslation("global");
  const { pathname, locale } = useRouter();
  const menuData = parseMenuData(props.menuData, locale as SupportedLanguage);
  const title = "404: Not found";
  const forsideTittel = localizeSanityContent(props.domeneTittel, locale as SupportedLanguage);

  useBreadcrumbs(forsideTittel, { tittel: title, slug: "404" });

  useMount(() => {
    loggNotFound(pathname || "N/A");
  });

  return (
    <Style>
      <SEO title={title} description="Fant ikke siden du lette etter" />
      <Sidetittel>{t("404")}</Sidetittel>
      <Normaltekst>{t("404-sub")}</Normaltekst>
      <Link href={"/"} passHref>
        <TilbakeTilForsidelenke className="lenke">
          {t("404-tilbake-til")} {forsideTittel}
        </TilbakeTilForsidelenke>
      </Link>
      <StyledNormaltekst>{t("404-andre-sider")}</StyledNormaltekst>
      <SideListe menuData={menuData} />
    </Style>
  );
};

export default NotFoundPage;
