import React from "react";
import { useTranslation } from "react-i18next";
import { BodyLong, Title } from "@navikt/ds-react";
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
      <Title level="2" size="m">
        {t("forsideIntroTittel")}
      </Title>

      <div className={styles.content}>
        {props.description && <BodyLong>{props.description}</BodyLong>}
        {props.content && <SanityContent blocks={props.content} />}
      </div>
    </article>
  );
}
