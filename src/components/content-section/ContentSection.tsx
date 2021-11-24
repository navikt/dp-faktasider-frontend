import React, { PropsWithChildren } from "react";
import { Heading } from "@navikt/ds-react";
import cx from "classnames";
import styles from "./ContentSection.module.scss";

interface Props {
  id?: string;
  title: string;
  headingLevel: HeadingLevel;
}

type HeadingLevel = "2" | "3" | "4";

export function ContentSection(props: PropsWithChildren<Props>) {
  const isHeadingLevel2 = props.headingLevel === "2";

  return (
    <div className={cx(styles.container, { [styles["container--no-padding"]]: !isHeadingLevel2 })}>
      {isHeadingLevel2 && (
        <article>
          {props.id && <div id={props.id} className={styles["hash-link-anchor"]} />}

          <div className={cx(styles["hash-link"], styles["hash-link--sticky"], styles["hash-link--center"])}>
            {renderHeading(props)}
          </div>

          {props.children}
        </article>
      )}

      {!isHeadingLevel2 && (
        <section>
          {props.id && <div id={props.id} className={styles["hash-link-anchor"]} />}
          <div className={styles["hash-link"]}>{renderHeading(props)}</div>
          {props.children}
        </section>
      )}
    </div>
  );
}

function renderHeading(props: PropsWithChildren<Props>) {
  return (
    <>
      <Heading size={getHeadingSize(props.headingLevel)} level={props.headingLevel}>
        {props.title}
        {props.id && (
          <a href={`#${props.id}`}>
            <LinkIcon />
          </a>
        )}
      </Heading>
    </>
  );
}

function LinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.5"
      height="23px"
      opacity="0.6"
    >
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  );
}

function getHeadingSize(level: HeadingLevel) {
  switch (level) {
    case "2":
      return "xlarge";
    case "3":
      return "large";
    case "4":
      return "small";
  }
}
