import { GetStaticPaths, GetStaticProps } from "next";
import { Revision, revisionsFetcher } from "../../components/historikk/api/revisionsFetcher";
import withErrorBoundary from "../../components/withErrorBoundary";
import { historikkFetcher, HistorikkResponse } from "../../components/historikk/api/historikkFetcher";
import DokumentHistorikk from "../../components/historikk/DokumentHistorikk";
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

export interface HistorikkTekster {
  title: string;
  kortInfo: string;
  langInfo: SanityBlock[];
  deltTekstForklaring: SanityBlock[];
}

export interface DokumentHistorikkProps {
  revisions: Revision[];
  response: HistorikkResponse | null;
  id: string;
  time: string | null;
  tekster?: HistorikkTekster;
}

export const getStaticProps: GetStaticProps<DokumentHistorikkProps> = async (context) => {
  const [id, time] = context.params!.slug as string[];

  if (!id) {
    return {
      notFound: true,
    };
  }

  const revisions = await revisionsFetcher(id);
  const response = time ? await historikkFetcher(id, time) : null;
  const tekster = await getClient(context.preview).fetch(groq`*[_id == 'historikkHjelpetekster'][0]`);

  return {
    props: {
      revisions,
      id,
      time: time || null,
      response,
      tekster: localizeSanityContent(tekster, context.locale as SupportedLanguage),
    },
    revalidate: 86400, // En gang i døgnet
  };
};

export default withErrorBoundary(DokumentHistorikk, "Historikk");
