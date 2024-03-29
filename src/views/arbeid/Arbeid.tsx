import React from "react";
import { useMount } from "react-use";
import { loggSidevisning } from "../../utils/logging";
import useBreadcrumbs from "../../components/faktaside/useBreadcrumbs";
import { Header } from "../../components/header/Header";
import { SEO } from "../../components/SEO";
import { Notifications } from "../../components/notifications/Notifications";
import { NavigationLinks } from "../../components/navigation-links/NavigationLinks";
import { Shortcuts } from "../../components/shortcuts/Shortcuts";
import { ForsideParsedData } from "../../sanity/groq/forside/parseForsideData";
import { MenuItem } from "../../sanity/groq/menu/parseMenuData";
import { KortFortalt } from "../../components/kort-fortalt/KortFortalt";
import styles from "./Arbeid.module.scss";

interface Props {
  menuData: MenuItem[];
  pageData: ForsideParsedData;
}

export function Arbeid(props: Props) {
  const title = props.pageData.title || "Arbeid";
  const description = props.pageData.beskrivelse || "";
  useBreadcrumbs(title);

  useMount(() => loggSidevisning("Forside - nav.no/arbeid"));

  return (
    <div className={styles.container}>
      <SEO title={title} description={description} seoImage={props.pageData.seoImage} />
      <Header title={title} />

      <main id={"maincontent"} className={styles.content}>
        {!!props.pageData.notifikasjoner?.length && <Notifications notifications={props.pageData.notifikasjoner} />}
        <KortFortalt content={props.pageData.kortFortalt} description={description} />
        <NavigationLinks links={props.menuData} />
        {!!props.pageData.snarveier?.length && <Shortcuts shortcuts={props.pageData.snarveier} />}
      </main>
    </div>
  );
}
