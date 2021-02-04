import * as React from "react";
import styled from "styled-components/macro";
import withErrorBoundary from "../../../components/withErrorBoundary";
import SideListe from "./SideListe";
import MobilmenyWrapper from "./MobilmenyWrapper";
import { theme } from "../../../styles/theme";
import { Systemtittel } from "nav-frontend-typografi";
import useUniqueId from "../../../utils/useUniqueId";
import { navFrontend } from "../../../styles/navFrontend";
import { useFaktasideContext } from "../FaktaSideContext";

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

function Header(props: { id: string; title?: string }) {
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

function Meny(props: Props) {
  const mobileTitleId = useUniqueId("mobile-menu");
  const desktopTitleId = useUniqueId("desktop-menu");
  const { menuData, domainTitle } = useFaktasideContext();

  return (
    <>
      <DesktopNav className={props.className} aria-labelledby={desktopTitleId}>
        <Header title={domainTitle} id={desktopTitleId} />
        <SideListe menuData={menuData} />
      </DesktopNav>
      <MobileNav className={props.className} aria-labelledby={mobileTitleId}>
        <MobilmenyWrapper>
          <Header title={domainTitle} id={mobileTitleId} />
          <SideListe menuData={menuData} />
        </MobilmenyWrapper>
      </MobileNav>
    </>
  );
}

export default withErrorBoundary(Meny, "Navigasjonsmeny");
