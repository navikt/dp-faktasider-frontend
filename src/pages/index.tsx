import React from "react";
import styled from "styled-components/macro";
import fetchProjectData, { ProjectData } from "../hooks/graphQl/fetchProjectData";
import { MenuItem } from "../hooks/graphQl/menuDataUtils";
import { theme } from "../styles/theme";
import DevKnapper from "../components/DevKnapper/DevKnapper";
import SEO from "../components/SEO";
import { useMount } from "react-use";
import { loggSidevisning } from "../utils/logging";
import { SupportedLanguage } from "../i18n/supportedLanguages";
import Notifikasjoner from "../components/faktaside/Notifikasjoner";
import { GetStaticProps } from "next";
import fetchFaktasiderMenuData from "../hooks/graphQl/fetchFaktasiderMenuData";
import Header from "../components/forside/Header";
import InfosideLenker from "../components/forside/InfosideLenker";
import { Snarveier } from "../components/forside/Snarveier";

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
  projectData: ProjectData;
  infosideLenker: MenuItem[];
  locale: SupportedLanguage;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const projectData = await fetchProjectData((context.locale as SupportedLanguage) || "no");
  const infosideLenker = await fetchFaktasiderMenuData((context.locale as SupportedLanguage) || "no");
  return {
    props: {
      projectData,
      infosideLenker,
      locale: context.locale,
    },
  };
};

export default function IndexPage(props: Props) {
  const { beskrivelse, title, komIgangLenker } = props.projectData;

  useMount(() => loggSidevisning("Forside - nav.no/arbeid"));
  /*useBreadcrumbs();*/
  return (
    <Style>
      <DevKnapper />
      <Header heading={title} beskrivelse={beskrivelse} />
      <SEO lang={props.locale} description={beskrivelse} title={title} path={`/${props.locale}`} />
      <Content>
        <Notifikasjoner notifikasjoner={props.projectData.forsideNotifikasjoner} />
        <InfosideLenker lenker={props.infosideLenker} />
        <Snarveier snarveier={komIgangLenker} />
      </Content>
    </Style>
  );
}
