import { groq } from "next-sanity";
import { Translations } from "../../../types/translations";
import { Notifikasjon } from "../../../components/Notifikasjoner";
import { SanityEksternLenke, SideoversiktLenke } from "../menu/menuQuery";

export interface ForsideQueryData {
  beskrivelse?: Translations<string>;
  snarveier?: SanityEksternLenke[];
  notifikasjoner?: Translations<Notifikasjon>;
  sideoversiktLenker?: SideoversiktLenke[];
  title?: Translations<string>;
}

export const forsideQuery = groq`*[_id == "oppsett"][0]{
  beskrivelse,
  "snarveier": komIgangLenker[visPaaForside == true],
  notifikasjoner,
  sideoversiktLenker,
  title
}`;
