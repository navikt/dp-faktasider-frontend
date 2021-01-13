import { sanityClient } from "../../../sanity/sanity-config";
import { groq } from "next-sanity";
import { SupportedLanguage } from "../../i18n/supportedLanguages";

interface FaktasidePath {
  slug: {
    current: string;
  }
}

const query = groq`
*[_type == "faktaSide"] {
  slug
}
`;

export default async function fetchFaktasidePaths(): Promise<FaktasidePath[]> {
  return await sanityClient.fetch(query);
}
