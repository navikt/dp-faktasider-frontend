import React from "react";
import { Heading } from "@navikt/ds-react";
import { useTranslation } from "react-i18next";
import { useFaktasideContext } from "../../views/faktaside/FaktaSideContext";
import Link from "next/link";
import styles from "./FaktasideHeader.module.scss";

export function FaktasideHeader() {
  const faktaside = useFaktasideContext();
  const { t } = useTranslation("global");

  const tekst =
    faktaside.publiseringsTidspunkt &&
    t("sistOppdatert", { publiseringstidspunkt: new Date(faktaside.publiseringsTidspunkt) });

  return (
    <div className={styles.container}>
      <Heading level={"1"} size={"2xlarge"}>
        {faktaside.title}
      </Heading>

      {tekst && (
        <div className={styles["last-updated"]}>
          <Link href={`/historikk/${faktaside.id}/${faktaside.publiseringsTidspunkt}`} passHref>
            <a rel="nofollow">{tekst}</a>
          </Link>
        </div>
      )}
    </div>
  );
}
