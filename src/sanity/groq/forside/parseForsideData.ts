import localizeSanityContent from "../../../i18n/localizeSanityContent";
import { SupportedLanguage } from "../../../i18n/supportedLanguages";
import { Notifikasjon } from "../../../components/Notifikasjoner";
import { ForsideQueryData, Snarvei } from "./forsideQuery";
import { SanityImage } from "../../types";
import parseRichText, { ParsedRichText } from "../../../utils/richTextUtils/parser/parseRichText";

export interface ForsideParsedData {
  seoImage?: SanityImage;
  title?: string;
  snarveier?: Snarvei[];
  kortFortalt?: ParsedRichText;
  beskrivelse?: string;
  notifikasjoner?: Notifikasjon[];
}

function parseForsideData(data: ForsideQueryData, lang: SupportedLanguage): ForsideParsedData {
  const localizedData = localizeSanityContent(data, lang);

  return {
    title: localizedData.title,
    snarveier: localizedData.snarveier,
    kortFortalt: parseRichText(localizedData.kortFortalt),
    beskrivelse: localizedData.beskrivelse,
    notifikasjoner: localizedData.notifikasjoner,
    seoImage: data.seoImage,
  };
}

export default parseForsideData;
