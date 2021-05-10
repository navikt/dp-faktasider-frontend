import { sanityConfig } from "./sanity-config";

interface Document extends Record<string, any> {
  _type: "faktaSide" | "deltTekst";
  _createdAt: string;
  _id: string;
  _rev: string;
  _updatedAt: string;
}

export interface HistoricVersionResponse {
  documents: Document[];
}

const token = process.env.SANITY_READ_TOKEN;
const { projectId, dataset } = sanityConfig;

export const historicVersionFetcher = async (docId: string, time: string): Promise<HistoricVersionResponse | null> => {
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
