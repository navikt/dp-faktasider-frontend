import React from "react";
import { HeaderIcon } from "./HeaderIcon";
import { Heading } from "@navikt/ds-react";
import styles from "./Header.module.scss";

interface Props {
  title: string;
}

export function Header(props: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Heading className={styles.title} level={"1"} size={"2xlarge"}>
          {props.title}
        </Heading>
        <HeaderIcon />
      </div>
    </div>
  );
}
