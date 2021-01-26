import * as React from "react";
import { FaktaSideProps } from "./types";
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

function Faktaside(props: FaktaSideProps) {
  const lang = props.lang;
  const erPublisert = props.visSprakversjon?.[lang];
  const tittel = props.title || "";
  const wordCountRef = useRef<HTMLDivElement>(null);

  /*useBreadcrumbs(props);*/

  useMount(() => loggSidevisning(tittel));
  useLoggUtdatertHashlenke();

  if (!erPublisert) {
    return <IkkeOversatt {...props} />;
  }

  const beskrivelse = props.beskrivelse || "";

  const parsedInnhold = props.innhold;
  return (
    <FaktasideProvider {...props}>
      <StickyFeedback />
      <SEO title={tittel} description={beskrivelse} lang={lang} path={props.path} />
      <FaktaSideLayout
        wordCountRef={wordCountRef}
        header={tittel}
        beskrivelse={beskrivelse}
        publiseringsTidspunkt={props.publiseringsTidspunkt}
      >
        <InnholdetErTilpasset />
        <Notifikasjoner notifikasjoner={props.notifikasjoner} />
        <div ref={wordCountRef}>
          <KortFortalt blocks={props.kortFortalt} />
          <BlockContent blocks={parsedInnhold} />
          <RelatertInformasjon blocks={props.relatertInformasjon} />
        </div>
      </FaktaSideLayout>
    </FaktasideProvider>
  );
}

export default Faktaside;
