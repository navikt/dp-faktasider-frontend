import localizeSanityContent from "../../../i18n/localizeSanityContent";
import { SupportedLanguage } from "../../../i18n/supportedLanguages";
import { Notifikasjon } from "../../../components/Notifikasjoner";
import { ForsideQueryData, Snarvei } from "./forsideQuery";
import { SanityImage } from "../../types";

export interface ForsideParsedData {
  seoImage?: SanityImage;
  title?: string;
  snarveier?: Snarvei[];
  beskrivelse?: string;
  forsideNotifikasjoner?: Notifikasjon[];
}

function parseForsideData(data: ForsideQueryData, lang: SupportedLanguage): ForsideParsedData {
  const localizedData = localizeSanityContent(data, lang);

  return {
    title: localizedData.title,
    snarveier: localizedData.snarveier,
    beskrivelse: localizedData.beskrivelse,
    forsideNotifikasjoner: localizedData.notifikasjoner,
    seoImage: data.seoImage,
  };
}

export default parseForsideData;
