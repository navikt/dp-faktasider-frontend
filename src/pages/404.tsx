import React from "react";
import SEO from "../components/SEO";
import styled from "styled-components/macro";
import { Normaltekst, Sidetittel } from "nav-frontend-typografi";
import { useTranslation } from "react-i18next";
import { useMount } from "react-use";
import { loggNotFound } from "../utils/logging";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import SideListe from "../components/faktaside/Meny/SideListe";
import { sanityClient } from "../sanity/sanity-config";
import { menuQuery, MenuQueryData } from "../sanity/groq/menu/menuQuery";
import { parseMenuData } from "../sanity/groq/menu/parseMenuData";
import { useLocale } from "../i18n/useLocale";

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

const StyledNormaltekst = styled(Normaltekst)`
  margin: 2rem 0 1rem !important;
`;

interface Props {
  menuData: MenuQueryData;
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const menuData: MenuQueryData = await sanityClient.fetch(menuQuery);

  return {
    props: {
      menuData,
    },
  };
};

const NotFoundPage = (props: Props) => {
  const { t } = useTranslation("global");
  const lang = useLocale();
  const path = useRouter().pathname;
  const menuData = parseMenuData(props.menuData, lang);

  useMount(() => {
    loggNotFound(path || "N/A");
  });

  return (
    <Style>
      <SEO title="404: Not found" description="Fant ikke siden du lette etter" />
      <Sidetittel>{t("404")}</Sidetittel>
      <Normaltekst>{t("404-sub")}</Normaltekst>
      <StyledNormaltekst>{t("404-andre-sider")}</StyledNormaltekst>
      <SideListe menuData={menuData} />
    </Style>
  );
};

export default NotFoundPage;
