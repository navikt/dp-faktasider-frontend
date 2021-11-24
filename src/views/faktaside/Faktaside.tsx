import React, { useRef } from "react";
import { useFaktasideContext } from "./FaktaSideContext";
import { FaktasideStaticProps } from "../../pages/[slug]";
import { SEO } from "../../components/SEO";
import { FaktasideHeader } from "../../components/faktaside-header/FaktasideHeader";
import { Notifications } from "../../components/notifications/Notifications";
import { FaktasideKortFortalt } from "../../components/faktaside-kort-fortalt/FaktasideKortFortalt";
import { TilpassInnhold } from "../../components/faktaside/TilpassInnhold/TilpassInnhold";
import { SanityContent } from "../../components/sanity-content/SanityContent";
import { Snarveier } from "../../components/faktaside/content/Snarveier";
import { Menu } from "../../components/menu/Menu";
import styles from "./Faktaside.module.scss";

export type FaktasideRawData = Omit<FaktasideStaticProps, "slug">;

export function Faktaside() {
  const context = useFaktasideContext();
  const title = context.title || "";
  const description = context.beskrivelse || "";
  const wordCountRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <SEO
        title={title}
        description={description}
        seoImage={context.rawData.oppsett.seoImage}
        path={`/${context.slug}`}
      />
      <div className={styles.container}>
        <Menu />
        <main id={"maincontent"} className={styles.content}>
          <FaktasideHeader />
          {!!context.notifikasjoner?.length && <Notifications notifications={context.notifikasjoner} />}

          <div ref={wordCountRef}>
            <FaktasideKortFortalt blocks={context.kortFortalt} beskrivelse={description} />
            {wordCountRef && <TilpassInnhold wordCountRef={wordCountRef} />}
            <SanityContent blocks={context.innhold} />
            <Snarveier snarveier={context.snarveier} />
          </div>
        </main>
      </div>
    </>
  );
}
