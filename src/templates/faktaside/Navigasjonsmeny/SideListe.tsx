import * as React from "react";
import { useReducer } from "react";
import { Link } from "gatsby";
import styled, { css } from "styled-components/macro";
import withErrorBoundary from "../../../components/withErrorBoundary";
import useFaktasiderMenuData from "../../../hooks/graphQl/useFaktasiderMenuData";
import Innholdsfortegnelse from "../InnholdsMeny/Innholdsfortegnelse";
import { useFaktasideContext } from "../FaktaSideContext";
import { loggMeny } from "../../../utils/logging";
import { UnmountClosed } from "react-collapse";
import { theme } from "../../../styles/theme";
import { ExternalMenuLinkData, InternalMenuLinkData, isInternal } from "../../../hooks/graphQl/menuDataUtils";

const StyledOl = styled.ol`
  margin-bottom: 8rem;
`;

const listeElementCommonStyling = css`
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.5rem ${theme.layoutPadding};
  color: inherit;
  &:hover {
    background-color: ${theme.colors.navLysGra};
  }
`;

const lenkeStyle = css`
  display: block;
  text-decoration: none;
  ${listeElementCommonStyling};
`;

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
      <li>
        <StyledButton
          isOpen={open}
          onClick={() => {
            toggle();
            loggMeny("Åpne/lukke innholdsfortegnelse");
          }}
          aria-expanded={open}
        >
          <span>{props.page.tittel}</span>
        </StyledButton>
        <UnmountClosed isOpened={open}>
          <Innholdsfortegnelse />
        </UnmountClosed>
      </li>
    );
  }

  return (
    <li>
      <StyledInternalLink className="lenke" to={props.page.path} onClick={() => loggMeny("Gå til ny side")}>
        <span>
          {props.page.tittel} {!props.page.tilgjengeligPåValgtSpråk ? `(${props.page.språk})` : ""}
        </span>
      </StyledInternalLink>
    </li>
  );
}

function EksternLenke(props: { lenke: ExternalMenuLinkData }) {
  return (
    <li>
      <StyledExternalLink className="lenke" href={props.lenke.url} onClick={() => loggMeny("Gå til ekstern side")}>
        {props.lenke.tittel}
      </StyledExternalLink>
    </li>
  );
}

function SideListe() {
  const menuData = useFaktasiderMenuData();

  return (
    <StyledOl>
      {menuData.map((link) =>
        isInternal(link) ? <InternSideLenke page={link} key={link.id} /> : <EksternLenke lenke={link} key={link.url} />
      )}
    </StyledOl>
  );
}

export default withErrorBoundary(SideListe, "SideListe");
