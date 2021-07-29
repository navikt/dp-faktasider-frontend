import * as React from "react";
import { useRef } from "react";
import { useMount } from "react-use";
import { loggSidevisning } from "../../utils/logging";
import useLoggUtdatertHashlenke from "./useLoggUtdatertHashlenke";
import IkkeOversatt from "./IkkeOversatt";
import { createFaktasideContext, FaktasideProvider } from "./FaktaSideContext";
import SEO from "../SEO";
import FaktaSideLayout from "./FaktaSideLayout";
import BlockContent from "../BlockContent/BlockContent";
import useBreadcrumbs from "./useBreadcrumbs";
import Notifikasjoner from "../Notifikasjoner";
import KortFortalt from "./content/KortFortalt";
import Snarveier from "./content/Snarveier";
import Header from "./content/Header";
import useLanguageSelector from "./useLanguageSelector";
import TilpassInnhold from "./TilpassInnhold/TilpassInnhold";
import { useLocale } from "../../i18n/useLocale";
import { FaktasideStaticProps } from "../../pages/[slug]";

export type FaktasideRawData = Omit<FaktasideStaticProps, "slug">;

function Faktaside(props: FaktasideRawData) {
  const locale = useLocale();
  const faktasideContext = createFaktasideContext(props, locale);
  const erPublisertPåSpråk = faktasideContext.visSprakversjon?.[locale];
  const tittel = faktasideContext.title || "";
  const beskrivelse = faktasideContext.beskrivelse || "";

  const wordCountRef = useRef<HTMLDivElement>(null);

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
      <SEO
        title={tittel}
        description={beskrivelse}
        seoImage={faktasideContext.rawData.oppsett.seoImage}
        path={`/${faktasideContext.slug}`}
      />
      <FaktaSideLayout>
        <Header />
        <Notifikasjoner notifikasjoner={faktasideContext?.notifikasjoner} />
        <div ref={wordCountRef}>
          <KortFortalt blocks={faktasideContext.kortFortalt} beskrivelse={beskrivelse} />
          {wordCountRef && <TilpassInnhold wordCountRef={wordCountRef} />}
          <BlockContent blocks={faktasideContext.innhold} />
          <Snarveier snarveier={faktasideContext.snarveier} />
        </div>
      </FaktaSideLayout>
    </FaktasideProvider>
  );
}

export default Faktaside;
