import localizeSanityContent from "../../../i18n/localizeSanityContent";
import { SupportedLanguage } from "../../../i18n/supportedLanguages";
import { Notifikasjon } from "../../../components/Notifikasjoner";
import { ForsideQueryData, Snarvei } from "./forsideQuery";

export interface ForsideParsedData {
  title?: string;
  snarveier?: Snarvei[];
  beskrivelse?: string;
  forsideNotifikasjoner?: Notifikasjon[];
}

function parseForsideData(data: ForsideQueryData, lang: SupportedLanguage): ForsideParsedData {
  const localizedData = localizeSanityContent(data, lang);
  const notifikasjoner: Notifikasjon[] = localizedData.notifikasjoner;
  const forsideNotifikasjoner = notifikasjoner?.filter((notifikasjon) => notifikasjon.visPaaForside);

  return {
    title: localizedData.title,
    snarveier: localizedData.snarveier,
    beskrivelse: localizedData.beskrivelse,
    forsideNotifikasjoner: forsideNotifikasjoner,
  };
}

export default parseForsideData;
