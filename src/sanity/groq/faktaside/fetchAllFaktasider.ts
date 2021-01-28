import { groq } from "next-sanity";
import { faktasideQuery, FaktasideQueryData } from "./faktasideQuery";
import { SupportedLanguage } from "../../../i18n/supportedLanguages";
import { getClient, sanityClient } from "../../sanity-config";
import { FaktasideParsedData, parseFaktasideData } from "./parseFaktasideData";

const faktasideSlugs = groq`*[_type == "faktaSide"][].slug.current`;

export default async function fetchAllFaktasider(
  lang: SupportedLanguage,
  preview?: boolean
): Promise<FaktasideParsedData[]> {
  const slugs: string[] = await getClient(!!preview).fetch(faktasideSlugs);
  const faktasidePromises = slugs.map((slug) => sanityClient.fetch(faktasideQuery, { slug }));

  const faktasider: FaktasideQueryData[] = await Promise.all(faktasidePromises);

  return faktasider.map((data) => parseFaktasideData(data, lang));
}
