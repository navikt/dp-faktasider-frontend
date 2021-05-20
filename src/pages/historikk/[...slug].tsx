import { GetStaticPaths, GetStaticProps } from "next";
import { Revision, revisionsFetcher } from "../../components/historikk/api/revisionsFetcher";
import withErrorBoundary from "../../components/withErrorBoundary";
import { historikkFetcher, HistorikkResponse } from "../../components/historikk/api/historikkFetcher";
import Historikk from "../../components/historikk/Historikk";
import { getClient } from "../../sanity/sanity-config";
import { groq } from "next-sanity";
import { SanityBlock } from "../../utils/richTextUtils/richTextTypes";
import localizeSanityContent from "../../i18n/localizeSanityContent";
import { SupportedLanguage } from "../../i18n/supportedLanguages";

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
  id: string;
  time: string | null;
  hjelpeTekster?: HistorikkHjelpeTekster;
}

export const getStaticProps: GetStaticProps<HistorikkProps> = async (context) => {
  const slugs = context.params!.slug as string[];

  const id = encodeURIComponent(slugs[0]);
  const time = encodeURIComponent(slugs[1]);

  if (!id) {
    return {
      notFound: true,
    };
  }

  const revisions = await revisionsFetcher(id);
  const response = time ? await historikkFetcher(id, time) : null;
  const hjelpeTekster = await getClient(context.preview).fetch(groq`*[_id == 'historikkHjelpetekster'][0]`);

  return {
    props: {
      revisions,
      id,
      time: time || null,
      response,
      hjelpeTekster: localizeSanityContent(hjelpeTekster, context.locale as SupportedLanguage),
    },
    revalidate: 86400, // En gang i døgnet
  };
};

export default withErrorBoundary(Historikk, "Historikk");
