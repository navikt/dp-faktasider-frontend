import * as React from "react";
import { useReducer } from "react";
import styled, { css } from "styled-components/macro";
import withErrorBoundary from "../../../components/withErrorBoundary";
import fetchFaktasiderMenuData from "../../../hooks/graphQl/fetchFaktasiderMenuData";
import Innholdsfortegnelse from "../InnholdsMeny/Innholdsfortegnelse";
import { useFaktasideContext } from "../FaktaSideContext";
import { loggMeny } from "../../../utils/logging";
import { UnmountClosed } from "react-collapse";
import { theme } from "../../../styles/theme";
import { ExternalMenuLinkData, InternalMenuLinkData, isInternal } from "../../../hooks/graphQl/menuDataUtils";
import NavFrontendChevron from "nav-frontend-chevron";
import HoyreChevron from "nav-frontend-chevron/lib/hoyre-chevron";

const StyledOl = styled.ol`
  margin-bottom: 8rem;
`;

const listeElementCommonStyling = css`
  display: flex;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.5rem ${theme.layoutPadding};
  color: inherit;
  i {
    margin-right: 0.5rem;
    margin-top: 0.7rem;
  }
  &:hover {
    background-color: ${theme.colors.navLysGra};
  }
`;

const lenkeStyle = css`
  display: block;
  text-decoration: none;
  ${listeElementCommonStyling};
`;

// @ts-ignore
const StyledInternalLink = styled(Link)`
  ${lenkeStyle};
`;

const StyledExternalLink = styled.a`
  ${lenkeStyle};
`;

export const menuHighlightStyle = css`
  background-color: #f8f8f8;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0.3rem;
    height: 100%;
    background-color: ${theme.colors.navBla};
  }
`;

const StyledButton = styled.button<{ isOpen: boolean }>`
  ${listeElementCommonStyling};
  width: 100%;
  border: none;
  background-color: transparent;
  cursor: pointer;
  text-align: start;
  ${(props) => !props.isOpen && menuHighlightStyle}
`;

function InternSideLenke(props: { page: InternalMenuLinkData }) {
  const faktasideContext = useFaktasideContext();
  const [open, toggle] = useReducer((state) => !state, true);

  const currentPage = props.page.id === faktasideContext.id;

  if (currentPage) {
    return (
      <>
        <StyledButton
          isOpen={open}
          onClick={() => {
            toggle();
            loggMeny("Åpne/lukke innholdsfortegnelse");
          }}
          aria-expanded={open}
        >
          <NavFrontendChevron type={open ? "ned" : "høyre"} />
          <span>{props.page.tittel}</span>
        </StyledButton>
        <UnmountClosed isOpened={open}>
          <Innholdsfortegnelse />
        </UnmountClosed>
      </>
    );
  }

  return (
    <StyledInternalLink className="lenke" to={props.page.path} onClick={() => loggMeny("Gå til ny side")}>
      <HoyreChevron />
      <span>
        {props.page.tittel} {!props.page.tilgjengeligPåValgtSpråk ? `(${props.page.språk})` : ""}
      </span>
    </StyledInternalLink>
  );
}

function EksternLenke(props: { lenke: ExternalMenuLinkData }) {
  return (
    <StyledExternalLink className="lenke" href={props.lenke.url} onClick={() => loggMeny("Gå til ekstern side")}>
      <HoyreChevron />
      <span>{props.lenke.tittel}</span>
    </StyledExternalLink>
  );
}

function SideListe() {
  const menuData = fetchFaktasiderMenuData();

  return (
    <StyledOl>
      {menuData.map((link) => (
        <li>
          {isInternal(link) ? (
            <InternSideLenke page={link} key={link.id} />
          ) : (
            <EksternLenke lenke={link} key={link.url} />
          )}
        </li>
      ))}
    </StyledOl>
  );
}

export default withErrorBoundary(SideListe, "SideListe");
