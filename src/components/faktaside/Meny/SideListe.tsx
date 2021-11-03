import React, { useReducer } from "react";
import styled, { css } from "styled-components/macro";
import { useFaktasideContext } from "../FaktaSideContext";
import { loggMeny } from "../../../utils/logging";
import { UnmountClosed } from "react-collapse";
import { theme } from "../../../styles/theme";
import Link from "next/link";
import { Innholdsfortegnelse } from "./Innholdsfortegnelse/Innholdsfortegnelse";
import { MenylenkeEkstern } from "../../../sanity/groq/menu/menuQuery";
import { MenuItem, MenylenkeInternParsed } from "../../../sanity/groq/menu/parseMenuData";
import { Chevron } from "./Chevron";

const StyledOl = styled.ol`
  margin-bottom: 8rem;
`;

const listeElementCommonStyling = css`
  display: flex;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  color: inherit;
  text-decoration: none;

  svg {
    flex-shrink: 0;
  }

  &:hover {
    background-color: ${theme.colors.navLysGra};
    color: inherit;
  }
`;

const StyledLink = styled.a.attrs({ className: "navds-link" })`
  display: block;
  ${listeElementCommonStyling};
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

const StyledButton = styled.button.attrs({ className: "navds-link" })<{ isOpen: boolean }>`
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
          <Chevron retning={open ? "ned" : "høyre"} />
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
      <StyledLink onClick={() => loggMeny("Gå til ny side")}>
        <Chevron retning="høyre" />
        <span>
          {props.lenke.tittel} {!props.lenke.tilgjengeligPåValgtSpråk ? `(${props.lenke.språk})` : ""}
        </span>
      </StyledLink>
    </Link>
  );
}

function EksternLenke(props: { lenke: MenylenkeEkstern }) {
  return (
    <StyledLink href={props.lenke.url} onClick={() => loggMeny("Gå til ekstern side")}>
      <Chevron retning="høyre" />
      {props.lenke.tittel}
    </StyledLink>
  );
}

interface Props {
  menuData?: MenuItem[];
}

export function SideListe(props: Props) {
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
