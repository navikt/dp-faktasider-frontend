import React, { useCallback, useEffect, useState } from "react";
import { pxFromTop } from "../../../../utils/domUtils";
import styled, { css } from "styled-components/macro";
import { useInnholdsListe } from "./useInnholdsListe";
import { LenkeUtenUnderstrek } from "../../../../utils/common-styled-components";
import { loggMeny } from "../../../../utils/logging";
import { useVisForContext } from "../../../BlockContent/VisFor/VisForContext";
import { UnmountClosed } from "react-collapse";
import { visBasertPåFiltrering } from "../../../BlockContent/VisFor/VisFor";
import { Draft } from "../../../BlockContent/draft/Draft";
import { theme } from "../../../../styles/theme";
import { visBasertPaaVisPaaConfig } from "../../../BlockContent/VisFor/VisPaaSide";
import { menuHighlightStyle } from "../SideListe";
import { useFaktasideContext } from "../../FaktaSideContext";
import { Group } from "../../../../utils/richTextUtils/parser/groupParser/groupParser";

const StyledLenke = styled((props) => <LenkeUtenUnderstrek {...props} />)`
  display: block;
  padding: 0.4rem ${theme.layoutPadding} 0.4rem calc(${theme.layoutPadding} * 1.75);
  ${(props) => props.erValgt && menuHighlightStyle}
  ${(props) =>
    props.erValgt &&
    css`
      text-decoration: underline !important;
    `}
`;

const skjermBrøk = 1 / 4; // Brukes for å beregne hvilken gruppe bruker ser på for øyeblikket. Hvis den er 1/4 må en gruppe være over den øverste 1/4 av for å regnes som "currentGroup"

function useCurrentlyViewedGroup(items: Group[]): Group | undefined {
  const [current, setCurrent] = useState<Group | undefined>();

  const updateCurrentlyViewedMenuItem = useCallback(() => {
    const current = items
      .map((it) => ({ item: it, fromTop: pxFromTop(it.blockConfig?.id || "N/A") }))
      .filter((it) => it.fromTop < window.innerHeight * skjermBrøk)
      .pop()?.item;
    setCurrent(current);
  }, [items]);

  useEffect(() => {
    window.addEventListener("scroll", updateCurrentlyViewedMenuItem, { passive: true });
    return () => window.removeEventListener("scroll", updateCurrentlyViewedMenuItem);
  }, [updateCurrentlyViewedMenuItem]);

  return current || items[0];
}

function MenuItem(props: { item: Group; current: boolean }) {
  const visForContext = useVisForContext();
  const faktaside = useFaktasideContext();
  const blockConfig = props.item.blockConfig;

  const handleClick = () => {
    loggMeny("Hopp til overskrift", { hashtag: blockConfig?.id });
  };

  const vis =
    visBasertPåFiltrering(faktaside.situasjonsvalg, visForContext, blockConfig?.visFor).vis &&
    visBasertPaaVisPaaConfig(faktaside.id, blockConfig?.visPaaSider);

  return (
    <Draft isDraft={!!blockConfig?.erUtkast}>
      <UnmountClosed isOpened={vis}>
        <li key={blockConfig?.id}>
          <StyledLenke erValgt={props.current} href={`#${blockConfig?.id}`} onClick={handleClick}>
            {props.item.title}
          </StyledLenke>
        </li>
      </UnmountClosed>
    </Draft>
  );
}

const StyledOl = styled.ol`
  padding: 0.5rem 0 1rem;
`;

export function Innholdsfortegnelse() {
  const innholdsListe = useInnholdsListe();
  const faktaside = useFaktasideContext();

  if (!innholdsListe.length) {
    return null;
  }

  return <PureInnholdsfortegnelse title={faktaside.title || "N/A"} innholdsListe={innholdsListe} />;
}

interface Props {
  title: string;
  innholdsListe: Group[];
}

export function PureInnholdsfortegnelse(props: Props) {
  const currentlyViewedGroup = useCurrentlyViewedGroup(props.innholdsListe);
  return (
    <StyledOl aria-label={`Innholdsfortegnelse ${props.title}`}>
      {props.innholdsListe.map((item) => (
        <MenuItem key={item.blockConfig?.id} item={item} current={currentlyViewedGroup === item} />
      ))}
    </StyledOl>
  );
}
