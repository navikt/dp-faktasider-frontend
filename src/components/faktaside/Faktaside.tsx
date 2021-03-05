import * as React from "react";
import { useRef } from "react";
import { useMount } from "react-use";
import { loggSidevisning } from "../../utils/logging";
import useLoggUtdatertHashlenke from "./useLoggUtdatertHashlenke";
import IkkeOversatt from "./IkkeOversatt";
import { FaktasideProvider } from "./FaktaSideContext";
import SEO from "../SEO";
import FaktaSideLayout from "./FaktaSideLayout";
import InnholdetErTilpasset from "./TilpassInnhold/InnholdetErTilpasset";
import BlockContent from "../BlockContent/BlockContent";
import { useRouter } from "next/router";
import { SupportedLanguage } from "../../i18n/supportedLanguages";
import Error from "next/error";
import useBreadcrumbs from "./useBreadcrumbs";
import { FaktasideParsedData } from "../../sanity/groq/faktaside/parseFaktasideData";
import Notifikasjoner from "../Notifikasjoner";
import KortFortalt from "./content/KortFortalt";
import Snarveier from "./content/Snarveier";
import Header from "./content/Header";
import { MenuItem } from "../../sanity/groq/menu/menuDataUtils";
import useLanguageSelector from "./useLanguageSelector";

export interface FaktasideProps extends FaktasideParsedData {
  menuData: MenuItem[];
}

function Faktaside(props: FaktasideProps) {
  const lang = useRouter().locale as SupportedLanguage;
  const wordCountRef = useRef<HTMLDivElement>(null);

  if (!props.id) {
    return <Error statusCode={404} />;
  }

  const erPublisert = props.visSprakversjon?.[lang];
  const tittel = props.title || "";
  const beskrivelse = props.beskrivelse || "";

  useBreadcrumbs(props.domainTitle, { tittel: props.title || "Du er her", slug: props.slug });
  useLanguageSelector();
  useMount(() => loggSidevisning(tittel));
  useLoggUtdatertHashlenke();

  if (!erPublisert) {
    return <IkkeOversatt {...props} />;
  }

  return (
    <FaktasideProvider faktasideProps={props}>
      <SEO title={tittel} description={beskrivelse} />
      <FaktaSideLayout wordCountRef={wordCountRef}>
        <Header />
        <InnholdetErTilpasset />
        <Notifikasjoner notifikasjoner={props?.notifikasjoner} />
        <div ref={wordCountRef}>
          <KortFortalt blocks={props.kortFortalt} beskrivelse={beskrivelse} />
          <BlockContent blocks={props.innhold} />
          <Snarveier snarveier={props.snarveier} />
        </div>
      </FaktaSideLayout>
    </FaktasideProvider>
  );
}

export default Faktaside;
