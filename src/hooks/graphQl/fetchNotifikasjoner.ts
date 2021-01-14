import { sanityClient } from "../../../sanity/sanity-config";
import { groq } from "next-sanity";
import Notifikasjoner, { Notifikasjon } from "../../templates/faktaside/Notifikasjoner";
import { SupportedLanguage } from "../../i18n/supportedLanguages";

const query = groq`
*[_id == "oppsett"][0] {
  notifikasjoner[]
}
`;

export default async function fetchNotifikasjoner(lang: SupportedLanguage, faktaSideId: string): Promise<Notifikasjon[]> {
  const data: { notifikasjoner: Notifikasjon[] } = await sanityClient.fetch(query);
  return data.notifikasjoner.filter((notifikasjon) => notifikasjon.visPaaSider?.some((side) => {
    console.log(side, faktaSideId); return side._ref === faktaSideId}));
}
