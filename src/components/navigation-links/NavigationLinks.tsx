import React from "react";
import { useTranslation } from "react-i18next";
import { MenuItem } from "../../sanity/groq/menu/parseMenuData";
import { InternalLink } from "./InternalLink";
import { ExternalLink } from "./ExternalLink";
import styles from "./NavigationLinks.module.scss";

interface Props {
  links: MenuItem[];
}

export function NavigationLinks(props: Props) {
  const { t } = useTranslation("global");

  return (
    <section className={styles.container}>
      <h2 className={"sr-only"}>{t("forsideInformasjonHeader")}</h2>
      <ul>
        {props.links.map((link, index) => (
          <li key={index}>
            {link._type === "menylenkeIntern" ? (
              <InternalLink link={link} key={link.pageId} />
            ) : (
              <ExternalLink link={link} key={link.url} />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
