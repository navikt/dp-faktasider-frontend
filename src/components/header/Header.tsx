import React from "react";
import { withErrorBoundary } from "../withErrorBoundary";
import { HeaderIcon } from "./HeaderIcon";
import { Heading } from "@navikt/ds-react";
import styles from "./Header.module.scss";

interface Props {
  title: string;
}

const HeaderComponent = (props: Props) => {
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
};

export const Header = withErrorBoundary(HeaderComponent, "Header");
