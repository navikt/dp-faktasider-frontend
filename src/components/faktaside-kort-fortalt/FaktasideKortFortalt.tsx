import React from "react";
import { Block } from "../../utils/richTextUtils/richTextTypes";
import { useTranslation } from "react-i18next";
import { KortFortaltIcon } from "./KortFortaltIkon";
import { SanityContent } from "../sanity-content/SanityContent";
import { idFromString } from "../../utils/idFromString";
import { BodyShort } from "@navikt/ds-react";
import { TestId } from "../../utils/test-ids";
import styles from "./FaktasideKortFortalt.module.scss";
import { ContentSection } from "../content-section/ContentSection";

interface Props {
  blocks?: Block[];
  beskrivelse?: string;
}

export function FaktasideKortFortalt(props: Props) {
  const { t } = useTranslation("global");
  const title = t("kortFortalt");

  return (
    <div className={styles.container} data-test-id={TestId.KORT_FORTALT}>
      <div className={styles["svg-container"]}>
        <KortFortaltIcon />
      </div>

      <ContentSection id={idFromString(title)} title={title} headingLevel={"2"}>
        <BodyShort>{props.beskrivelse}</BodyShort>
        <SanityContent blocks={props.blocks} />
      </ContentSection>
    </div>
  );
}
