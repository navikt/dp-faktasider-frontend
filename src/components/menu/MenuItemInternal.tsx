import React, { useReducer } from "react";
import { MenylenkeInternParsed } from "../../sanity/groq/menu/parseMenuData";
import { useFaktasideContext } from "../../views/faktaside/FaktaSideContext";
import { loggMeny } from "../../utils/logging";
import { UnmountClosed } from "react-collapse";
import { TableOfContents } from "../table-of-contents/TableOfContents";
import Link from "next/link";
import cx from "classnames";
import styles from "./Menu.module.scss";
import { Next } from "@navikt/ds-icons";

interface Props {
  link: MenylenkeInternParsed;
}

export function MenuItemInternal(props: Props) {
  const faktaside = useFaktasideContext();
  const [open, toggle] = useReducer((state) => !state, true);
  const currentPage = props.link.pageId === faktaside.id;

  if (currentPage) {
    return (
      <>
        <button
          className={cx("navds-link", styles["menu-item"])}
          onClick={() => {
            toggle();
            loggMeny("Åpne/lukke innholdsfortegnelse");
          }}
          aria-expanded={open}
        >
          <div className={cx(styles.chevron, { [styles["chevron--down"]]: open })}>
            <Next />
          </div>
          <span>{props.link.tittel}</span>
        </button>
        <UnmountClosed isOpened={open}>
          <TableOfContents />
        </UnmountClosed>
      </>
    );
  }

  return (
    <Link href={props.link.path} locale={props.link.språk} passHref>
      <button className={cx("navds-link", styles["menu-item"])} onClick={() => loggMeny("Gå til ny side")}>
        <div className={styles.chevron}>
          <Next />
        </div>
        <span>
          {props.link.tittel} {!props.link.tilgjengeligPåValgtSpråk ? `(${props.link.språk})` : ""}
        </span>
      </button>
    </Link>
  );
}
