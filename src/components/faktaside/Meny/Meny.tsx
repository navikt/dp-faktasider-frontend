import React from "react";
import styled from "styled-components";
import { SideListe } from "./SideListe";
import MobilmenyWrapper from "./MobilmenyWrapper";
import { theme } from "../../../styles/theme";
import { navFrontend } from "../../../styles/navFrontend";
import { useFaktasideContext } from "../FaktaSideContext";
import { Heading } from "@navikt/ds-react";
import { TestId } from "../../../utils/test-ids";

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

const HeaderStyle = styled(Heading)`
  padding: 1.5rem 1.5rem 0.75rem;
  pointer-events: none;

  &::after {
    border-bottom: ${navFrontend.navGra40} 0.1rem solid;
    content: "";
    display: block;
    margin-top: 1rem;
  }
`;

function Header(props: { id?: string; title?: string }) {
  return (
    <HeaderStyle id={props.id} level="2" size="large">
      <span className="sr-only">Sideoversikt</span>
      {props.title}
    </HeaderStyle>
  );
}

interface Props {
  className?: string;
}

export function Meny(props: Props) {
  const { menuData, domainTitle } = useFaktasideContext();

  return (
    <>
      <DesktopNav className={props.className} data-test-id={TestId.DESKTOP_NAVIGATION}>
        <Header title={domainTitle} />
        <SideListe menuData={menuData} />
      </DesktopNav>

      <MobileNav className={props.className} data-test-id={TestId.MOBILE_NAVIGATION}>
        <MobilmenyWrapper>
          <Header title={domainTitle} />
          <SideListe menuData={menuData} />
        </MobilmenyWrapper>
      </MobileNav>
    </>
  );
}
