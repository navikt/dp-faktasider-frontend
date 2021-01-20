import * as React from "react";
import { useRef } from "react";
import withErrorBoundary from "../components/withErrorBoundary";
import { GetStaticProps } from "next";
import fetchFaktasidePaths from "../hooks/graphQl/fetchFaktasidePaths";
import { SupportedLanguage } from "../i18n/supportedLanguages";
import fetchFaktaside from "../hooks/graphQl/fetchFaktaside";
import { useMount } from "react-use";
import { loggSidevisning } from "../utils/logging";
import useLoggUtdatertHashlenke from "../components/faktaside/useLoggUtdatertHashlenke";
import IkkeOversatt from "../components/faktaside/IkkeOversatt";
import { FaktasideProvider } from "../components/faktaside/FaktaSideContext";
import SEO from "../components/SEO";
import StickyFeedback from "../components/faktaside/StickyFeedback";
import FaktaSideLayout from "../components/faktaside/FaktaSideLayout";
import InnholdetErTilpasset from "../components/faktaside/InnholdsMeny/InnholdetErTilpasset";
import Notifikasjoner from "../components/faktaside/Notifikasjoner";
import KortFortalt from "../components/faktaside/KortFortalt";
import BlockContent from "../components/BlockContent/BlockContent";
import RelatertInformasjon from "../components/faktaside/RelatertInformasjon";
import fetchFaktasiderMenuData from "../hooks/graphQl/fetchFaktasiderMenuData";
import { FaktaSideProps } from "../components/faktaside/types";

export const getStaticProps: GetStaticProps = async (context) => {
  const lang = context.locale as SupportedLanguage;
  const faktaside = await fetchFaktaside(lang, context.params!.slug as string);
  const menuData = await fetchFaktasiderMenuData(lang);

  return {
    props: {
      ...JSON.parse(JSON.stringify(faktaside)),
      path: "random",
      menuData,
    },
  };
};

export async function getStaticPaths() {
  const faktasidePaths = await fetchFaktasidePaths();
  const paths = faktasidePaths.map((side) => ({
    params: { slug: side.slug.current },
  }));
  return {
    paths,
    fallback: false,
  };
}

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

export default withErrorBoundary(Faktaside, "FaktaSide");
