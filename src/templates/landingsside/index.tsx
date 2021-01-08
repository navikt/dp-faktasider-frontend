import React from "react";
import { PageProps } from "gatsby";
import styled from "styled-components/macro";
import Header from "../felles/Header";
import useFaktasiderMenuData from "../../hooks/graphQl/useFaktasiderMenuData";
import localizeSanityContent from "../../i18n/localizeSanityContent";
import useProjectData, { ProjectData } from "../../hooks/graphQl/useProjectData";
import { LandingssideProps } from "../../../gatsby-utils/createLandingsside";
import SEO from "../../components/SEO";
import { useLocale } from "../../i18n/LocaleContext";
import { useMount } from "react-use";
import { loggSidevisning } from "../../utils/logging";
import InfosideLenker from "./InfosideLenker";
import { MenuItem } from "../../hooks/graphQl/menuDataUtils";
import { Snarveier } from "./Snarveier";
import useBreadcrumbs from "../faktaside/useBreadcrumbs";
import DevKnapper from "../../components/DevKnapper/DevKnapper";
import Notifikasjoner from "../faktaside/Notifikasjoner";
import { theme } from "../../styles/theme";

const Style = styled.div`
  background-color: ${theme.colors.bakgrunn};
`;

const Content = styled.main`
  > * {
    margin-left: auto;
    margin-right: auto;
  }
`;

const IndexPage = (props: PageProps<{}, LandingssideProps>) => {
  const projectData = useProjectData();
  const sider = useFaktasiderMenuData();

  return <PureIndexPage projectData={projectData} infosideLenker={sider} path={props.location.pathname} />;
};

interface Props {
  projectData: ProjectData;
  infosideLenker: MenuItem[];
  path: string;
}

export function PureIndexPage(props: Props) {
  const lang = useLocale();
  const { beskrivelse, title, komIgangLenker } = props.projectData;

  useMount(() => loggSidevisning("Forside - nav.no/arbeid"));
  useBreadcrumbs();

  return (
    <Style>
      <DevKnapper />
      <Header heading={localizeSanityContent(title, lang)} beskrivelse={beskrivelse} />
      <SEO lang={lang} description={beskrivelse} title={title} path={props.path} />
      <Content>
        <Notifikasjoner notifikasjoner={props.projectData.forsideNotifikasjoner} />
        <InfosideLenker lenker={props.infosideLenker} />
        <Snarveier snarveier={komIgangLenker} />
      </Content>
    </Style>
  );
}

export default IndexPage;
