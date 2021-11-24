import React from "react";
import { Next } from "@navikt/ds-icons";
import { MenylenkeEkstern } from "../../sanity/groq/menu/menuQuery";
import { loggMeny } from "../../utils/logging";
import styles from "./Menu.module.scss";
import cx from "classnames";

interface Props {
  link: MenylenkeEkstern;
}

export function MenuItemExternal(props: Props) {
  return (
    <a
      href={props.link.url}
      className={cx("navds-link", styles["menu-item"])}
      onClick={() => loggMeny("Gå til ekstern side")}
    >
      <div className={styles.chevron}>
        <Next />
      </div>
      {props.link.tittel}
    </a>
  );
}
