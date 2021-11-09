import { sanityConfig } from "../../../sanity/sanity-config";
import { SanityBlock } from "../../../utils/richTextUtils/richTextTypes";

export interface HistoriskDokument {
  _type: "faktaSide" | "deltTekst";
  _createdAt: string;
  _id: string;
  _rev: string;
  _updatedAt: string;
  beskrivelse: string;
  nokkelordBeskrivelse: string;
  kortFortalt?: SanityBlock[];
  innhold?: SanityBlock[];
  title: string;
  visIngenValgPasser: boolean;
}

export interface HistorikkResponse {
  documents: HistoriskDokument[];
}

const token = process.env.SANITY_READ_TOKEN;
const { projectId, dataset } = sanityConfig;

export const historikkFetcher = async (docId: string, time: string): Promise<HistorikkResponse | null> => {
  try {
    const url = `https://${projectId}.apicdn.sanity.io/v1/data/history/${dataset}/documents/${docId}?time=${time}`;

    const response = await fetch(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  } catch (e) {
    // TODO logg til amplitude/sentry?
    console.error(e);
    return null;
  }
};
