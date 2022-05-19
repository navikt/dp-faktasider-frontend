import React, { useEffect, useReducer, useRef } from "react";
import styled, { css } from "styled-components";
import { SanityContent } from "../../sanity-content/SanityContent";
import { Tillegsinformasjon } from "../../../utils/richTextUtils/richTextTypes";
import parseRichText from "../../../utils/richTextUtils/parser/parseRichText";
import { useTranslation } from "react-i18next";
import useUniqueId from "../../../utils/useUniqueId";
import { theme } from "../../../styles/theme";
import VisMerPanel from "./VisMerPanel";
import { loggVisTilleggsinfo } from "../../../utils/logging";
import { useMount, usePrevious } from "react-use";
import useUserIsSearchingText from "../../../hooks/useUserIsSearchingText";
import HashLink from "../../HashLink";
import Anchor from "../../Anchor";
import { useIsHashInUrl } from "../../../hooks/useIsHashInUrl";
import { showLinkOnHover } from "../../Section/CommonSectionMarkup";
import { BodyShort } from "@navikt/ds-react";

interface Props {
  node: Tillegsinformasjon;
}

const asideBorder = `solid .1rem ${theme.colors.navBlaLighten80}`;

const StyledAside = styled.aside<{ isOpen: boolean }>`
  position: relative;
  border-top: ${asideBorder};
  border-bottom: ${asideBorder};
  padding: 1.5rem 0.5rem;
  margin: 1.5rem 0;
  transition: 0.3s;
  ${(props) =>
    props.isOpen &&
    css`
      background-color: #f0f0f0;
    `}
`;

const StyledLabel = styled(BodyShort)`
  opacity: 0.75;
  font-size: 0.7rem !important;
  margin: 0 0 0.2rem !important;
  text-transform: uppercase;
`;

const StyledHeading = styled.h1.attrs({ className: "navds-label" })`
  margin-top: 0;
  ${showLinkOnHover};
  ${theme.focusOnRelativeParent};
`;

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  ${StyledHeading} {
    order: 2;
  }
`;

function reducer(state: boolean, action: "setOpen" | "toggle"): boolean {
  switch (action) {
    case "setOpen":
      return true;
    case "toggle":
    default:
      return !state;
  }
}

export function Tilleggsinnformasjon(props: Props) {
  const parsedText = parseRichText(props.node.innhold);
  const hashId = props.node.blockConfig?.id || "N/A";
  const isInUrl = useIsHashInUrl(hashId);
  const [open, dispatch] = useReducer(reducer, false);
  const headerId = useUniqueId("tilleggsinfo-" + props.node.title);
  const { t } = useTranslation("global");
  const ref = useRef<HTMLHeadingElement>(null);
  const userIsSearchingText = useUserIsSearchingText();

  useMount(() => isInUrl && dispatch("setOpen"));

  useEffect(() => {
    userIsSearchingText && dispatch("setOpen");
  }, [userIsSearchingText]);

  const prevOpen = usePrevious(open);
  useEffect(() => {
    !prevOpen && open && loggVisTilleggsinfo(props.node.title);
  }, [open, prevOpen, props.node.title]);

  useEffect(() => {
    !prevOpen && open && ref.current?.focus(); // For accessibility/skjermleser og for at panelet skal åpne seg nedover istedenfor å forsvinne opp og ut av synsfeltet.
  });

  return (
    <StyledAside aria-labelledby={headerId} isOpen={open}>
      <Anchor id={hashId} spaceAbove="6rem" focusOnParent={true} />
      <StyledHeader>
        <StyledHeading id={headerId} tabIndex={-1} ref={ref}>
          {props.node.title}
          <HashLink id={hashId} />
        </StyledHeading>
        <StyledLabel>{t("tilleggsinformasjon")}</StyledLabel>
      </StyledHeader>
      <VisMerPanel toggle={() => dispatch("toggle")} open={open}>
        <SanityContent blocks={parsedText} />
      </VisMerPanel>
    </StyledAside>
  );
}
