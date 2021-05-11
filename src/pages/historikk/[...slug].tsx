import { GetStaticPaths, GetStaticProps } from "next";
import { Revision, revisionsFetcher } from "../../sanity/revisionsFetcher";
import withErrorBoundary from "../../components/withErrorBoundary";
import { historicVersionFetcher, HistoricVersionResponse } from "../../sanity/historicVersionFetcher";
import DokumentHistorikk from "../../components/historikk/DokumentHistorikk";

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  return {
    paths: [],
    fallback: true,
  };
};

export interface DokumentHistorikkProps {
  revisions: Revision[];
  response: HistoricVersionResponse | null;
  id: string;
  time: string | null;
}

export const getStaticProps: GetStaticProps<DokumentHistorikkProps> = async (context) => {
  const [id, time] = context.params!.slug as string[];

  if (!id) {
    return {
      notFound: true,
    };
  }

  const revisions = await revisionsFetcher(id);
  const response = time ? await historicVersionFetcher(id, time) : null;

  return {
    props: {
      revisions,
      id,
      time: time || null,
      response,
    },
    revalidate: 86400, // En gang i døgnet
  };
};

export default withErrorBoundary(DokumentHistorikk, "Historikk");
