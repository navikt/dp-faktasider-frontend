import { sanityClient } from "../../../sanity/sanity-config";
import { groq } from "next-sanity";
import { SupportedLanguage } from "../../i18n/supportedLanguages";
import fetchNotifikasjoner from "./fetchNotifikasjoner";
import { createFaktasideContext, FaktasideContext } from "./fetchFaktaside";


export default async function fetchAllFaktasider(lang: SupportedLanguage): Promise<FaktasideContext[]> {
  const query = groq`
  *[_type == "faktaSide"] {
    "id": _id,
    ...
  }
  `;

  const faktasider = await sanityClient.fetch(query);
  const notifikasjoner = await fetchNotifikasjoner();
  return faktasider.map((faktaside) => createFaktasideContext(faktaside, lang, notifikasjoner));
}
