import { sanityConfig } from "../../../sanity/sanity-config";

interface RawRevision {
  author: string;
  documentIDs: string[];
  id: string;
  mutations: any[];
  timestamp: string;
}

export type Revision = Omit<RawRevision, "author">;

const token = process.env.SANITY_READ_TOKEN;
const { projectId, dataset } = sanityConfig;

export const revisionsFetcher = async (docId: string): Promise<Revision[]> => {
  try {
    const url = `https://${projectId}.apicdn.sanity.io/v1/data/history/${dataset}/transactions/${docId}?excludeContent=true`;

    const response = await fetch(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    // https://stackoverflow.com/questions/60634337/when-using-fetch-how-to-convert-response-body-from-application-x-ndjson-to-appli
    const text = await response.text();
    const revisions: RawRevision[] | undefined = text.match(/.+/g)?.map((it) => JSON.parse(it));

    if (!revisions) {
      return [];
    }

    // Har ikke lyst til å sende med author til frontend
    return revisions.map(({ id, documentIDs, timestamp, mutations }) => ({ id, documentIDs, timestamp, mutations }));
  } catch (e) {
    console.error(e);
    return [];
  }
};
