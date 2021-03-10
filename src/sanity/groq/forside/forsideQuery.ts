import { groq } from "next-sanity";
import { Translations } from "../../../types/translations";
import { Notifikasjon } from "../../../components/Notifikasjoner";

export interface Snarvei {
  _type: "snarvei";
  url: string;
  tittel: string;
  visPaaSider?: string[];
}

export interface ForsideQueryData {
  beskrivelse?: Translations<string>;
  snarveier?: Snarvei[];
  notifikasjoner?: Translations<Notifikasjon>;
  title?: Translations<string>;
}

export const forsideQuery = groq`*[_id == "oppsett"][0]{
  beskrivelse,
  "snarveier": snarveier[visPaaForside == true],
  notifikasjoner,
  title
}`;
