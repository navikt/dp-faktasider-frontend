import * as React from "react";
import styled from "styled-components/macro";
import withErrorBoundary from "../../../components/withErrorBoundary";
import SideListe from "./SideListe";
import MobilmenyWrapper from "./MobilmenyWrapper";
import { theme } from "../../../styles/theme";
import useProjectData from "../../../hooks/graphQl/useProjectData";
import { Systemtittel } from "nav-frontend-typografi";
import useUniqueId from "../../../utils/useUniqueId";
import { navFrontend } from "../../../styles/navFrontend";

const DesktopNav = styled.nav`
  @media (${theme.media.smallScreen}) {
    display: none;
  }
  background-color: white;
  @supports (position: sticky) {
    position: sticky;
    max-height: calc(100vh);
    top: 0;
    overflow-y: auto;
    transition: top 0.2s, max-height 0.2s;
  }
  max-width: 16rem;
`;

const MobileNav = styled.nav`
  @media not all and (${theme.media.smallScreen}) {
    display: none;
  }
`;

const HeaderStyle = styled(Systemtittel)`
  padding: ${theme.layoutPadding} ${theme.layoutPadding} 0.75rem;
  pointer-events: none;
  &::after {
    border-bottom: ${navFrontend.navGra40} 0.1rem solid;
    content: "";
    display: block;
    margin-top: 1rem;
  }
`;

function Header(props: { id: string; title: string }) {
  return (
    <HeaderStyle id={props.id}>
      <span className="sr-only">Sideoversikt</span>
      {props.title}
    </HeaderStyle>
  );
}

interface Props {
  className?: string;
}

function Navigasjonsmeny(props: Props) {
  const mobileTitleId = useUniqueId("mobile-menu");
  const desktopTitleId = useUniqueId("desktop-menu");
  const projectData = useProjectData();

  return (
    <>
      <DesktopNav className={props.className} aria-labelledby={desktopTitleId}>
        <Header title={projectData.title} id={desktopTitleId} />
        <SideListe />
      </DesktopNav>
      <MobileNav className={props.className} aria-labelledby={mobileTitleId}>
        <MobilmenyWrapper>
          <Header title={projectData.title} id={mobileTitleId} />
          <SideListe />
        </MobilmenyWrapper>
      </MobileNav>
    </>
  );
}

export default withErrorBoundary(Navigasjonsmeny, "Navigasjonsmeny");
