import localizeSanityContent from "../../../i18n/localizeSanityContent";
import { SupportedLanguage } from "../../../i18n/supportedLanguages";
import { Notification } from "../../../components/notifications/Notifications";
import { ForsideQueryData, Snarvei } from "./forsideQuery";
import { SanityImage } from "../../types";
import parseRichText from "../../../utils/richTextUtils/parser/parseRichText";
import { Block } from "../../../utils/richTextUtils/richTextTypes";

export interface ForsideParsedData {
  seoImage?: SanityImage;
  title?: string;
  snarveier?: Snarvei[];
  kortFortalt?: Block[];
  beskrivelse?: string;
  notifikasjoner?: Notification[];
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
