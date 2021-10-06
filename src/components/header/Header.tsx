import React from "react";
import { withErrorBoundary } from "../withErrorBoundary";
import { HeaderIcon } from "./HeaderIcon";
import { Title } from "@navikt/ds-react";
import styles from "./Header.module.scss";

interface Props {
  title: string;
}

const HeaderComponent = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Title className={styles.title} level={1} size={"2xl"}>
          {props.title}
        </Title>
        <HeaderIcon />
      </div>
    </div>
  );
};

export const Header = withErrorBoundary(HeaderComponent, "Header");
