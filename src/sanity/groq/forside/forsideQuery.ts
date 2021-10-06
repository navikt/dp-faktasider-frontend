import { groq } from "next-sanity";
import { Translations } from "../../../types/translations";
import { Notification } from "../../../components/notifications/Notifications";
import { SanityImage } from "../../types";
import { SanityBlock } from "../../../utils/richTextUtils/richTextTypes";

export interface Snarvei {
  _type: "snarvei";
  url: string;
  tittel: string;
  visPaaSider?: string[];
}

export interface ForsideQueryData {
  seoImage?: SanityImage;
  beskrivelse?: Translations<string>;
  kortFortalt?: Translations<SanityBlock[]>;
  snarveier?: Snarvei[];
  notifikasjoner?: Translations<Notification>;
  title?: Translations<string>;
}

export const forsideQuery = groq`*[_id == "oppsett"][0]{
  seoImage,
  beskrivelse,
  kortFortalt,
  "snarveier": snarveier[visPaaForside == true],
  "notifikasjoner": *[ _type == "notifikasjon" && visPaaForside == true],
  title
}`;
