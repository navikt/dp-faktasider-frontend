import * as React from "react";
import { useMount } from "react-use";
import { loggSidevisning } from "../../utils/logging";
import useBreadcrumbs from "../faktaside/useBreadcrumbs";
import Header from "./Header";
import SEO from "../SEO";
import Notifikasjoner from "../Notifikasjoner";
import InfosideLenker from "./InfosideLenker";
import { Snarveier } from "./Snarveier";
import styled from "styled-components/macro";
import { theme } from "../../styles/theme";
import { ForsideParsedData } from "../../sanity/groq/forside/parseForsideData";
import { MenuItem } from "../../sanity/groq/menu/parseMenuData";
import KortFortalt from "./KortFortalt";

const Style = styled.div`
  background-color: ${theme.colors.bakgrunn};
`;

const Content = styled.main`
  > * {
    margin-left: auto;
    margin-right: auto;
    margin-top: ${theme.layoutMargin};
  }
`;

interface Props {
  forsideData: ForsideParsedData;
  menuData: MenuItem[];
}

function Forside(props: Props) {
  const title = props.forsideData.title || "Arbeid";
  const beskrivelse = props.forsideData.beskrivelse || "";
  useBreadcrumbs(title);

  useMount(() => loggSidevisning("Forside - nav.no/arbeid"));

  return (
    <Style>
      <Header heading={title} beskrivelse={beskrivelse} />
      <SEO description={beskrivelse} title={title} seoImage={props.forsideData.seoImage} path="" />
      <Content id={"maincontent"}>
        <Notifikasjoner notifikasjoner={props.forsideData.notifikasjoner} />
        <KortFortalt kortFortalt={props.forsideData.kortFortalt} />
        <InfosideLenker lenker={props.menuData} />
        <Snarveier snarveier={props.forsideData.snarveier} />
      </Content>
    </Style>
  );
}

export default Forside;
