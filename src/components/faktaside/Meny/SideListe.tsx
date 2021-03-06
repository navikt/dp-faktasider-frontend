import * as React from "react";
import { useReducer } from "react";
import styled, { css } from "styled-components/macro";
import withErrorBoundary from "../../../components/withErrorBoundary";
import { useFaktasideContext } from "../FaktaSideContext";
import { loggMeny } from "../../../utils/logging";
import { UnmountClosed } from "react-collapse";
import { theme } from "../../../styles/theme";
import Link from "next/link";
import NavFrontendChevron from "nav-frontend-chevron";
import HoyreChevron from "nav-frontend-chevron/lib/hoyre-chevron";
import Innholdsfortegnelse from "./Innholdsfortegnelse/Innholdsfortegnelse";
import { MenylenkeEkstern } from "../../../sanity/groq/menu/menuQuery";
import { MenuItem, MenylenkeInternParsed } from "../../../sanity/groq/menu/parseMenuData";

const StyledOl = styled.ol`
  margin-bottom: 8rem;
`;

const listeElementCommonStyling = css`
  display: flex;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.5rem ${theme.layoutPadding};
  color: inherit;

  .nav-frontend-chevron {
    margin-right: 0.5rem;
    margin-top: 0.7rem;
  }

  &:hover {
    background-color: ${theme.colors.navLysGra};
  }
`;

const StyledLink = styled.a`
  display: block;
  text-decoration: none !important;
  ${listeElementCommonStyling};
`;

export const menuHighlightStyle = css`
  && {
    background-color: #f8f8f8;
  }
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

function InternLenke(props: { lenke: MenylenkeInternParsed }) {
  const faktaside = useFaktasideContext();
  const [open, toggle] = useReducer((state) => !state, true);

  const currentPage = props.lenke.pageId === faktaside.id;

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
          <span>{props.lenke.tittel}</span>
        </StyledButton>
        <UnmountClosed isOpened={open}>
          <Innholdsfortegnelse />
        </UnmountClosed>
      </>
    );
  }

  return (
    <Link href={props.lenke.path} locale={props.lenke.språk} passHref>
      <StyledLink className="lenke" onClick={() => loggMeny("Gå til ny side")}>
        <HoyreChevron />
        <span>
          {props.lenke.tittel} {!props.lenke.tilgjengeligPåValgtSpråk ? `(${props.lenke.språk})` : ""}
        </span>
      </StyledLink>
    </Link>
  );
}

function EksternLenke(props: { lenke: MenylenkeEkstern }) {
  return (
    <StyledLink className="lenke" href={props.lenke.url} onClick={() => loggMeny("Gå til ekstern side")}>
      <HoyreChevron />
      {props.lenke.tittel}
    </StyledLink>
  );
}

interface Props {
  menuData?: MenuItem[];
}

function SideListe(props: Props) {
  const { menuData } = props;
  return (
    <StyledOl>
      {menuData?.map((link, index) => (
        <li key={index}>
          {link._type === "menylenkeIntern" ? (
            <InternLenke lenke={link} key={link.pageId} />
          ) : (
            <EksternLenke lenke={link} key={link.url} />
          )}
        </li>
      ))}
    </StyledOl>
  );
}

export default withErrorBoundary(SideListe, "SideListe");
