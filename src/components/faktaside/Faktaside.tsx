import * as React from "react";
import { useRef } from "react";
import { useMount } from "react-use";
import { loggSidevisning } from "../../utils/logging";
import useLoggUtdatertHashlenke from "./useLoggUtdatertHashlenke";
import IkkeOversatt from "./IkkeOversatt";
import { FaktasideProvider } from "./FaktaSideContext";
import StickyFeedback from "./StickyFeedback";
import SEO from "../SEO";
import FaktaSideLayout from "./FaktaSideLayout";
import InnholdetErTilpasset from "./InnholdsMeny/InnholdetErTilpasset";
import Notifikasjoner from "./Notifikasjoner";
import KortFortalt from "./KortFortalt";
import BlockContent from "../BlockContent/BlockContent";
import RelatertInformasjon from "./RelatertInformasjon";
import { FaktasideParsedData } from "./types";
import { useRouter } from "next/router";
import { SupportedLanguage } from "../../i18n/supportedLanguages";
import { MenuItem } from "../../hooks/graphQl/menuDataUtils";
import Error from "next/error";

function Faktaside(props: { data: FaktasideParsedData; menuData: MenuItem[] }) {
  const lang = useRouter().locale as SupportedLanguage;
  const wordCountRef = useRef<HTMLDivElement>(null);
  const { faktaside, oppsett } = props.data;

  if (!faktaside) {
    return <Error statusCode={404} />;
  }

  const erPublisert = faktaside.visSprakversjon?.[lang];
  const tittel = faktaside.title || "";
  const beskrivelse = faktaside.beskrivelse || "";

  /*useBreadcrumbs(props);*/

  useMount(() => loggSidevisning(tittel));
  useLoggUtdatertHashlenke();

  if (!erPublisert) {
    return <IkkeOversatt {...props} />;
  }

  return (
    <FaktasideProvider faktasideData={props.data}>
      <StickyFeedback />
      <SEO title={tittel} description={beskrivelse} lang={lang} path={""} />
      <FaktaSideLayout
        wordCountRef={wordCountRef}
        header={tittel}
        beskrivelse={beskrivelse}
        publiseringsTidspunkt={faktaside.publiseringsTidspunkt}
      >
        <InnholdetErTilpasset />
        <Notifikasjoner notifikasjoner={oppsett?.notifikasjoner} />
        <div ref={wordCountRef}>
          <KortFortalt blocks={faktaside.kortFortalt} />
          <BlockContent blocks={faktaside.innhold} />
          <RelatertInformasjon blocks={faktaside.relatertInformasjon} />
        </div>
      </FaktaSideLayout>
    </FaktasideProvider>
  );
}

export default Faktaside;
