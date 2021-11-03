import React, { useRef } from "react";
import { useMount } from "react-use";
import { loggSidevisning } from "../../utils/logging";
import useLoggUtdatertHashlenke from "./useLoggUtdatertHashlenke";
import { IkkeOversatt } from "./IkkeOversatt";
import { createFaktasideContext, FaktasideProvider, useFaktasideContext } from "./FaktaSideContext";
import { SEO } from "../SEO";
import { FaktaSideLayout } from "./FaktaSideLayout";
import { SanityContent } from "../sanity-content/SanityContent";
import useBreadcrumbs from "./useBreadcrumbs";
import { Notifications } from "../notifications/Notifications";
import { KortFortalt } from "./content/KortFortalt";
import { Snarveier } from "./content/Snarveier";
import Header from "./content/Header";
import useLanguageSelector from "./useLanguageSelector";
import { TilpassInnhold } from "./TilpassInnhold/TilpassInnhold";
import { useLocale } from "../../i18n/useLocale";
import { FaktasideStaticProps } from "../../pages/[slug]";

export type FaktasideRawData = Omit<FaktasideStaticProps, "slug">;

function FaktasideContainer(props: FaktasideRawData) {
  const locale = useLocale();
  const faktasideContext = createFaktasideContext(props, locale);
  const erPublisertPåSpråk = faktasideContext.visSprakversjon?.[locale];
  const tittel = faktasideContext.title || "";

  useBreadcrumbs(faktasideContext.domainTitle, [
    { tittel: faktasideContext.title || "Du er her", path: faktasideContext.slug },
  ]);
  useLanguageSelector();
  useMount(() => loggSidevisning(tittel));
  useLoggUtdatertHashlenke();

  if (!erPublisertPåSpråk) {
    return <IkkeOversatt {...faktasideContext} />;
  }

  return (
    <FaktasideProvider faktasideContext={faktasideContext}>
      <Faktaside />
    </FaktasideProvider>
  );
}

function Faktaside() {
  const context = useFaktasideContext();
  const tittel = context.title || "";
  const beskrivelse = context.beskrivelse || "";
  const wordCountRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <SEO
        title={tittel}
        description={beskrivelse}
        seoImage={context.rawData.oppsett.seoImage}
        path={`/${context.slug}`}
      />
      <FaktaSideLayout>
        <Header />
        {!!context.notifikasjoner?.length && <Notifications notifications={context.notifikasjoner} />}
        <div ref={wordCountRef}>
          <KortFortalt blocks={context.kortFortalt} beskrivelse={beskrivelse} />
          {wordCountRef && <TilpassInnhold wordCountRef={wordCountRef} />}
          <SanityContent blocks={context.innhold} />
          <Snarveier snarveier={context.snarveier} />
        </div>
      </FaktaSideLayout>
    </>
  );
}

export default FaktasideContainer;
