import { GetStaticPaths, GetStaticProps } from "next";
import { Revision, revisionsFetcher } from "../../components/historikk/api/revisionsFetcher";
import withErrorBoundary from "../../components/withErrorBoundary";
import { historikkFetcher, HistorikkResponse } from "../../components/historikk/api/historikkFetcher";
import Historikk from "../../components/historikk/Historikk";
import { getClient, sanityClient } from "../../sanity/sanity-config";
import { groq } from "next-sanity";
import { SanityBlock } from "../../utils/richTextUtils/richTextTypes";
import localizeSanityContent from "../../i18n/localizeSanityContent";
import { SupportedLanguage } from "../../i18n/supportedLanguages";
import { domeneTittelQuery } from "../../sanity/groq/commonQuerries";
import { historiskGyldigeIdQuery } from "../../sanity/groq/historikk/faktasideQuery";

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export interface HistorikkHjelpeTekster {
  title: string;
  kortInfo: string;
  langInfo: SanityBlock[];
  deltTekstForklaring: SanityBlock[];
}

export interface HistorikkProps {
  revisions: Revision[];
  response: HistorikkResponse | null;
  request: {
    id: string;
    time: string | null;
  };
  hjelpeTekster?: HistorikkHjelpeTekster;
  domeneTittel: string;
}

export const getStaticProps: GetStaticProps<HistorikkProps> = async (context) => {
  const gyldigeIder: string[] = await sanityClient.fetch(historiskGyldigeIdQuery);
  const slugs = context.params!.slug as string[];
  const domeneTittel = await sanityClient.fetch(domeneTittelQuery);

  const request = {
    id: encodeURIComponent(slugs[0]),
    time: encodeURIComponent(slugs[1]),
  };

  if (!gyldigeIder.includes(request.id)) {
    return {
      notFound: true,
    };
  }

  const revisions = await revisionsFetcher(request.id);
  const response = request.time ? await historikkFetcher(request.id, request.time) : null;
  const hjelpeTekster = await getClient(context.preview).fetch(groq`*[_id == 'historikkHjelpetekster'][0]`);

  return {
    props: {
      revisions,
      request,
      response,
      hjelpeTekster: localizeSanityContent(hjelpeTekster, context.locale as SupportedLanguage),
      domeneTittel,
    },
    revalidate: 86400, // En gang i døgnet
  };
};

export default withErrorBoundary(Historikk, "Historikk");
