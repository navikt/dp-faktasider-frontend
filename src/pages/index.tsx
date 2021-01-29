import React from "react";
import styled from "styled-components/macro";
import { theme } from "../styles/theme";
import DevKnapper from "../components/DevKnapper/DevKnapper";
import SEO from "../components/SEO";
import { useMount } from "react-use";
import { loggSidevisning } from "../utils/logging";
import { SupportedLanguage } from "../i18n/supportedLanguages";
import Notifikasjoner from "../components/Notifikasjoner";
import { GetStaticProps } from "next";
import Header from "../components/forside/Header";
import InfosideLenker from "../components/forside/InfosideLenker";
import { Snarveier } from "../components/forside/Snarveier";
import { getClient } from "../sanity/sanity-config";
import { menuQuery, MenuQueryData } from "../sanity/groq/menu/menuQuery";
import { parseMenuData } from "../sanity/groq/menu/parseMenuData";
import { useLocale } from "../i18n/useLocale";
import useBreadcrumbs from "../components/faktaside/useBreadcrumbs";
import { forsideQuery, ForsideQueryData } from "../sanity/groq/forside/forsideQuery";
import parseForsideData from "../sanity/groq/forside/parseForsideData";

const Style = styled.div`
  background-color: ${theme.colors.bakgrunn};
`;

const Content = styled.main`
  > * {
    margin-left: auto;
    margin-right: auto;
  }
`;

interface Props {
  forsideData: ForsideQueryData;
  menuData: MenuQueryData;
  locale: SupportedLanguage;
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const forsideData: ForsideQueryData = await getClient(!!context.preview).fetch(forsideQuery);
  const menuData: MenuQueryData = await getClient(!!context.preview).fetch(menuQuery);
  return {
    props: {
      forsideData,
      menuData,
      locale: context.locale as SupportedLanguage,
    },
  };
};

export default function IndexPage(props: Props) {
  const lang = useLocale();
  const parsedData = parseForsideData(props.forsideData, lang);
  const menuItems = parseMenuData(props.menuData, lang);

  useMount(() => loggSidevisning("Forside - nav.no/arbeid"));

  const title = parsedData.title || "Arbeid";
  const beskrivelse = parsedData.beskrivelse || "";
  useBreadcrumbs(title);

  return (
    <Style>
      <DevKnapper />
      <Header heading={title} beskrivelse={beskrivelse} />
      <SEO description={beskrivelse} title={title} />
      <Content>
        <Notifikasjoner notifikasjoner={parsedData.forsideNotifikasjoner} />
        <InfosideLenker lenker={menuItems} />
        <Snarveier snarveier={parsedData.komIgangLenker} />
      </Content>
    </Style>
  );
}
