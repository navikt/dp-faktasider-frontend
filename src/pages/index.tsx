import React from "react";
import styled from "styled-components/macro";
import fetchProjectData, { ProjectData } from "../hooks/graphQl/fetchProjectData";
import { MenuItem } from "../hooks/graphQl/menuDataUtils";
import { theme } from "../styles/theme";
import DevKnapper from "../components/DevKnapper/DevKnapper";
import Header from "../templates/felles/Header";
import SEO from "../components/SEO";
import { useMount } from "react-use";
import { loggSidevisning } from "../utils/logging";
import { SupportedLanguage } from "../i18n/supportedLanguages";

// @ts-ignore
const Style = styled.div`
  background-color: ${theme.colors.bakgrunn};
`;

// @ts-ignore
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

export async function getStaticProps(context): Promise<{ props: Props }> {
  console.log(context);
  const projectData = await fetchProjectData(context.locale);
  return {
    props: {
      // @ts-ignore
      projectData, infosideLenker: null,
      locale: context.locale
    } // will be passed to the page component as props
  };
}

export default function IndexPage(props: Props) {
  console.log(props);
  const { beskrivelse, title, komIgangLenker } = props.projectData;

    useMount(() => loggSidevisning("Forside - nav.no/arbeid"));
  /*    useBreadcrumbs();*/
  return (
    <Style>
      <DevKnapper />
      <Header heading={title} beskrivelse={beskrivelse} />
      <SEO lang={props.locale} description={beskrivelse} title={title} path={"props.path"} />{/*
        <Content>
          <Notifikasjoner notifikasjoner={props.projectData.forsideNotifikasjoner} />
          <InfosideLenker lenker={props.infosideLenker} />
          <Snarveier snarveier={komIgangLenker} />
        </Content>*!/*/}
    </Style>
  );
}

