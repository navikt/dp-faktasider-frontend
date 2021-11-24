import React from "react";
import { useTranslation } from "react-i18next";
import { supportedLanguages } from "../../i18n/supportedLanguages";
import { useMount } from "react-use";
import { loggNotTranslated } from "../../utils/logging";
import Link from "next/link";
import { SEO } from "../../components/SEO";
import { BodyShort, Heading } from "@navikt/ds-react";
import { FaktasideContext } from "../faktaside/FaktaSideContext";
import styles from "./MissingLanguage.module.scss";

export function MissingLanguage(props: FaktasideContext) {
  const { t } = useTranslation("global");
  const title = props.title || "";

  useMount(() => loggNotTranslated(title));

  const translations = supportedLanguages.map((lang) => {
    const published = props.visSprakversjon?.[lang];
    if (!published) {
      return null;
    }
    const title = props.rawData?.faktaside?.title?.[lang];

    return (
      <li key={props.slug}>
        <Link href={`/${props.slug}`} locale={lang}>
          <a>
            {title} - ({t(lang)})
          </a>
        </Link>
      </li>
    );
  });

  return (
    <div className={styles.container}>
      <SEO
        title={title}
        description={props.beskrivelse || ""}
        seoImage={props.rawData.oppsett.seoImage}
        path={`/${props.slug}`}
      />
      <Heading size="xlarge" spacing level="1">
        {t("ikkeOversatt")}
      </Heading>
      {translations.length && (
        <>
          <BodyShort>{t("tilgjengeligPåAndreSpråk")}</BodyShort>
          <ul>{translations}</ul>
        </>
      )}
    </div>
  );
}
