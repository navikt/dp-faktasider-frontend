import React from "react";
import { Title } from "@navikt/ds-react";
import { useTranslation } from "react-i18next";
import { Snarvei } from "../../sanity/groq/forside/forsideQuery";
import { Chevron } from "../faktaside/Meny/Chevron";
import styles from "./Shortcuts.module.scss";

interface Props {
  shortcuts: Snarvei[];
}

export function Shortcuts(props: Props) {
  const { t } = useTranslation("global");

  return (
    <div className={styles.container}>
      <section>
        <Title size={"l"} level={2}>
          {t("forsideKomIgangHeader")}
        </Title>

        <ul>
          {props.shortcuts.map((shortcut) => (
            <li key={shortcut.url}>
              <a className={"navds-link"} href={shortcut.url}>
                <Chevron retning={"høyre"} />
                <span>{shortcut.tittel}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
