import { sanityClient } from "../../sanity/sanity-config";
import { groq } from "next-sanity";
import { Notifikasjon } from "../../components/faktaside/Notifikasjoner";

const query = groq`
*[_id == "oppsett"][0] {
  notifikasjoner[]
}
`;

export default async function fetchNotifikasjoner(): Promise<Notifikasjon[]> {
  const data: { notifikasjoner: Notifikasjon[] } = await sanityClient.fetch(query);
  return data.notifikasjoner;
}
