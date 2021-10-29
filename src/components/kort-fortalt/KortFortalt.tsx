import React from "react";
import { useTranslation } from "react-i18next";
import { BodyLong, Heading } from "@navikt/ds-react";
import { SanityContent } from "../sanity-content/SanityContent";
import { Block } from "../../utils/richTextUtils/richTextTypes";
import styles from "./KortFortalt.module.scss";

interface Props {
  content?: Block[];
  description?: string;
}

export function KortFortalt(props: Props) {
  const { t } = useTranslation();

  return (
    <article className={styles.container}>
      <Heading level="2" size="medium">
        {t("forsideIntroTittel")}
      </Heading>

      <div className={styles.content}>
        {props.description && <BodyLong>{props.description}</BodyLong>}
        {props.content && <SanityContent blocks={props.content} />}
      </div>
    </article>
  );
}
