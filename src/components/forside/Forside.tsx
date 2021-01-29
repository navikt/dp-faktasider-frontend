import * as React from "react";
import { useMount } from "react-use";
import { loggSidevisning } from "../../utils/logging";
import useBreadcrumbs from "../faktaside/useBreadcrumbs";
import DevKnapper from "../DevKnapper/DevKnapper";
import Header from "./Header";
import SEO from "../SEO";
import Notifikasjoner from "../Notifikasjoner";
import InfosideLenker from "./InfosideLenker";
import { Snarveier } from "./Snarveier";
import styled from "styled-components/macro";
import { theme } from "../../styles/theme";
import { ForsideParsedData } from "../../sanity/groq/forside/parseForsideData";
import { MenuParsedData } from "../../sanity/groq/menu/parseMenuData";

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
  forsideData: ForsideParsedData;
  menuData: MenuParsedData;
}

function Forside(props: Props) {
  const title = props.forsideData.title || "Arbeid";
  const beskrivelse = props.forsideData.beskrivelse || "";
  useBreadcrumbs(title);

  useMount(() => loggSidevisning("Forside - nav.no/arbeid"));

  return (
    <Style>
      <DevKnapper />
      <Header heading={title} beskrivelse={beskrivelse} />
      <SEO description={beskrivelse} title={title} />
      <Content>
        <Notifikasjoner notifikasjoner={props.forsideData.forsideNotifikasjoner} />
        <InfosideLenker lenker={props.menuData} />
        <Snarveier snarveier={props.forsideData.komIgangLenker} />
      </Content>
    </Style>
  );
}

export default Forside;
