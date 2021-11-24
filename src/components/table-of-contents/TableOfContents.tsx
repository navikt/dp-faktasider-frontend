import React, { useCallback, useEffect, useState } from "react";
import { pxFromTop } from "../../utils/domUtils";
import { useInnholdsListe } from "../../hooks/useInnholdsListe";
import { loggMeny } from "../../utils/logging";
import { useVisForContext } from "../BlockContent/VisFor/VisForContext";
import { UnmountClosed } from "react-collapse";
import { visBasertPåFiltrering } from "../BlockContent/VisFor/VisFor";
import { Draft } from "../BlockContent/draft/Draft";
import { visBasertPaaVisPaaConfig } from "../BlockContent/VisFor/VisPaaSide";
import { useFaktasideContext } from "../../views/faktaside/FaktaSideContext";
import { Group } from "../../utils/richTextUtils/parser/groupParser/groupParser";
import styles from "./TableOfContents.module.scss";
import { Link } from "@navikt/ds-react";
import cx from "classnames";

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
    loggMeny("Hopp til overskrift");
  };

  const vis =
    visBasertPåFiltrering(faktaside.situasjonsvalg, visForContext, blockConfig?.visFor).vis &&
    visBasertPaaVisPaaConfig(faktaside.id, blockConfig?.visPaaSider);

  return (
    <Draft isDraft={!!blockConfig?.erUtkast}>
      <UnmountClosed isOpened={vis}>
        <li key={blockConfig?.id}>
          <Link
            className={cx(styles["content-item"], { [styles["content-item--selected"]]: props.current })}
            href={`#${blockConfig?.id}`}
            onClick={handleClick}
          >
            {props.item.title}
          </Link>
        </li>
      </UnmountClosed>
    </Draft>
  );
}

export function TableOfContents() {
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
    <ol className={styles["table-of-contents"]} aria-label={`Innholdsfortegnelse ${props.title}`}>
      {props.innholdsListe.map((item) => (
        <MenuItem key={item.blockConfig?.id} item={item} current={currentlyViewedGroup === item} />
      ))}
    </ol>
  );
}
