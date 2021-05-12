import { sanityConfig } from "../../../sanity/sanity-config";

export interface HistoriskDokument extends Record<string, any> {
  _type: "faktaSide" | "deltTekst";
  _createdAt: string;
  _id: string;
  _rev: string;
  _updatedAt: string;
}

export interface HistorikkResponse {
  documents: HistoriskDokument[];
}

const token = process.env.SANITY_READ_TOKEN;
const { projectId, dataset } = sanityConfig;

export const historikkFetcher = async (docId: string, time: string): Promise<HistorikkResponse | null> => {
  try {
    const url = `https://${projectId}.api.sanity.io/v1/data/history/${dataset}/documents/${docId}?time=${time}`;

    const response = await fetch(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  } catch (e) {
    console.error(e);
    return null;
  }
};
