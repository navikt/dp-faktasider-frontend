import * as React from "react";
import { useRef } from "react";
import withErrorBoundary from "../components/withErrorBoundary";
import { GetStaticProps } from "next";
import fetchFaktasidePaths from "../hooks/graphQl/fetchFaktasidePaths";
import { SupportedLanguage } from "../i18n/supportedLanguages";
import fetchFaktaside, { FaktasideContext } from "../hooks/graphQl/fetchFaktaside";
import { useMount } from "react-use";
import { loggSidevisning } from "../utils/logging";
import useLoggUtdatertHashlenke from "../templates/faktaside/useLoggUtdatertHashlenke";
import IkkeOversatt from "../templates/faktaside/IkkeOversatt";
import { FaktasideProvider } from "../templates/faktaside/FaktaSideContext";
import SEO from "../components/SEO";
import StickyFeedback from "../templates/faktaside/StickyFeedback";
import FaktaSideLayout from "../templates/faktaside/FaktaSideLayout";
import InnholdetErTilpasset from "../templates/faktaside/InnholdsMeny/InnholdetErTilpasset";
import Notifikasjoner from "../templates/faktaside/Notifikasjoner";
import KortFortalt from "../templates/faktaside/KortFortalt";
import BlockContent from "../components/BlockContent/BlockContent";
import RelatertInformasjon from "../templates/faktaside/RelatertInformasjon";
import fetchFaktasiderMenuData from "../hooks/graphQl/fetchFaktasiderMenuData";
import { FaktaSideProps } from "../templates/faktaside/types";


export const getStaticProps: GetStaticProps = async (context) => {
  const lang = context.locale as SupportedLanguage;
  const faktaside = await fetchFaktaside(lang, context.params.slug);
  const menuData = await fetchFaktasiderMenuData(lang);

  return {
    props: {
      path: "random",
      menuData,
      ...JSON.parse(JSON.stringify(faktaside))
    }
  };
};

export async function getStaticPaths() {
  const faktasidePaths = await fetchFaktasidePaths();
  const paths = faktasidePaths.map(side => ({
    params: { slug: side.slug.current }
  }));
  return {
    paths,
    fallback: false
  };
}

function Faktaside(props: FaktaSideProps) {
  const lang = props.lang;
  const erPublisert = props.visSprakversjon?.[lang];
  const tittel = props.title || "";
  const wordCountRef = useRef<HTMLDivElement>(null);

  /*
    useBreadcrumbs(page);
  */

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

export default withErrorBoundary(Faktaside, "FaktaSide");
