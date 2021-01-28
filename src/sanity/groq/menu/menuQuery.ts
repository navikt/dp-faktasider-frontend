import { groq } from "next-sanity";
import { Translations } from "../../../types/translations";

export const menuQuery = groq`{
  "lenker": *[_id == "oppsett"][0].sideoversiktLenker[] {
    ...,
    defined(_ref) => {
      "id": @-> _id,
      "referenceType": @-> _type
    }
  },
  "sider": *[_type == "faktaSide"] {
    title,
    beskrivelse,
    nokkelordBeskrivelse,
    visSprakversjon,
    "id": _id,
    "slug": slug.current
  }
}
`;

export interface MenuQueryData {
  lenker: SideoversiktLenke[];
  sider: MenuDataSide[];
}

export interface MenuDataSide {
  title?: Translations<string>;
  beskrivelse?: Translations<string>;
  nokkelordBeskrivelse?: Translations<string>;
  visSprakversjon?: {
    no?: boolean;
    en?: boolean;
  };
  id: string;
  slug: string;
}

export interface SanityInternLenke {
  _type: "reference";
  referenceType: "faktaSide";
  id: string;
}

export interface SanityEksternLenke {
  _type: "eksternLenke";
  url: string;
  tittel: string;
  beskrivelse: string;
}

export type SideoversiktLenke = SanityInternLenke | SanityEksternLenke;

export function isSanityInternLenke(lenke: SideoversiktLenke): lenke is SanityInternLenke {
  return lenke._type === "reference" && lenke.referenceType === "faktaSide";
}
