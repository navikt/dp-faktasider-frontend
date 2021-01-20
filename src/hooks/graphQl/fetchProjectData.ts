import localizeSanityContent from "../../i18n/localizeSanityContent";
import { sanityClient } from "../../sanity/sanity-config";
import { groq } from "next-sanity";
import { SupportedLanguage } from "../../i18n/supportedLanguages";
import { Notifikasjon } from "../../components/faktaside/Notifikasjoner";

export interface EksternLenkeI {
  tittel: string;
  beskrivelse: string;
  url: string;
}

export interface ProjectData {
  title: string;
  folketrygdensGrunnbellop: number;
  komIgangLenker?: EksternLenkeI[];
  beskrivelse: string;
  forsideNotifikasjoner?: Notifikasjon[];
}

const query = groq`
*[_id == "oppsett"][0]
`;

async function fetchProjectData(lang: SupportedLanguage): Promise<ProjectData> {
  const data = await sanityClient.fetch(query);
  const localizedData = localizeSanityContent(data, lang);

  if (!data.folketrygdensGrunnbellop) {
    throw new Error("Kunne ikke hente grunnbelløp");
  }

  const notifikasjoner: Notifikasjon[] = localizedData.notifikasjoner;
  const forsideNotifikasjoner = notifikasjoner.filter((notifikasjon) => notifikasjon.visPaaForside);

  return {
    title: localizedData.title,
    folketrygdensGrunnbellop: data.folketrygdensGrunnbellop,
    komIgangLenker: localizedData.komIgangLenker,
    beskrivelse: localizedData.beskrivelse,
    forsideNotifikasjoner: forsideNotifikasjoner,
  };
}

export default fetchProjectData;
