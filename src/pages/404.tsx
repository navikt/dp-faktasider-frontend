import React from "react";
import SEO from "../components/SEO";
import styled from "styled-components/macro";
import { Normaltekst, Sidetittel } from "nav-frontend-typografi";
import { useTranslation } from "react-i18next";
import { useLocation, useMount } from "react-use";
import { loggNotFound } from "../utils/logging";
import { GetStaticProps } from "next";
import { SupportedLanguage } from "../i18n/supportedLanguages";
import fetchFaktasiderMenuData from "../hooks/graphQl/fetchFaktasiderMenuData";
import { useRouter } from "next/router";
import { MenuItem } from "../hooks/graphQl/menuDataUtils";
import SideListe from "../components/faktaside/Navigasjonsmeny/SideListe";

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
export const getStaticProps: GetStaticProps = async (context) => {
  const menuData = await fetchFaktasiderMenuData(context.locale as SupportedLanguage);

  return {
    props: {
      menuData,
    },
  };
};

interface Props {
  menuData: MenuItem[];
}

const NotFoundPage = (props: Props) => {
  const { t } = useTranslation("global");
  const lang = useRouter().locale as SupportedLanguage;
  const path = useLocation().pathname;

  useMount(() => {
    loggNotFound(path || "N/A");
  });

  return (
    <Style>
      <SEO title="404: Not found" description="" lang={lang} path={"/404/"} />
      <Sidetittel>{t("404")}</Sidetittel>
      <Normaltekst>{t("404-sub")}</Normaltekst>
      <StyledNormaltekst>{t("404-andre-sider")}</StyledNormaltekst>
      <SideListe menuData={props.menuData} />
    </Style>
  );
};

export default NotFoundPage;
