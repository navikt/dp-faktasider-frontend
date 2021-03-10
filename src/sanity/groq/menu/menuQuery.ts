import { groq } from "next-sanity";
import { Translations } from "../../../types/translations";
import { Modify } from "../../../utils/typeUtils";

export const menuQuery = groq`{
  "lenker": *[_id == "oppsett"][0].menyLenker[] {
    ...,
    defined(_ref) => {
      "pageId": @-> _id,
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
  lenker?: MenyLenkeRaw[];
  sider?: MenuDataSide[];
}

export type TranslatedMenuQueryData = Modify<
  MenuQueryData,
  {
    sider?: TranslatedMenuDataSide[];
  }
>;

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

export type TranslatedMenuDataSide = Modify<
  MenuDataSide,
  {
    title?: string;
    beskrivelse?: string;
    nokkelordBeskrivelse?: string;
  }
>;

export interface MenylenkeInternRaw {
  _type: "reference";
  referenceType: "faktaSide";
  pageId: string;
}

export interface MenylenkeEkstern {
  _type: "menylenkeEkstern";
  url: string;
  tittel: string;
  beskrivelse?: string;
}

export type MenyLenkeRaw = MenylenkeInternRaw | MenylenkeEkstern;
