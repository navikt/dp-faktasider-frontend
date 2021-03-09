import { groq } from "next-sanity";
import { Translations } from "../../../types/translations";
import { SanityBlock } from "../../../utils/richTextUtils/richTextTypes";
import { Notifikasjon } from "../../../components/Notifikasjoner";
import { Snarvei } from "../forside/forsideQuery";

const innholdFields = `
[] {
  ...,
  "deltTekst": deltTekst->
}`;

export const faktasideQuery = groq`{
  'faktaside': *[_type == "faktaSide" && slug.current == $slug][0] {
    ...,
    "id": _id,
    "slug": slug.current,
    innhold {
      no ${innholdFields},
      en ${innholdFields},
      _type
    }
  },
  'oppsett': *[_id == "oppsett"][0] {
    title,
    folketrygdensGrunnbellop,
    notifikasjoner[],
    snarveier
  }
}`;

export interface FaktasideQueryData {
  faktaside: {
    id: string;
    _updatedAt: string;
    title?: Translations<string>;
    beskrivelse?: Translations<string>;
    innhold?: Translations<SanityBlock[]>;
    kortFortalt?: Translations<SanityBlock[]>;
    slug: string;
    visSprakversjon?: {
      en?: boolean;
      no?: boolean;
    };
    visIngenValgPasser?: boolean;
  };
  oppsett: {
    title?: Translations<string>;
    folketrygdensGrunnbellop?: number;
    notifikasjoner?: Notifikasjon[];
    snarveier?: Snarvei[];
  };
}

export interface LocalizedFaktasideQueryData {
  faktaside: FaktasideQueryData["faktaside"] & {
    title?: string;
    beskrivelse?: string;
    innhold?: SanityBlock[];
    kortFortalt?: SanityBlock[];
  };
  oppsett: FaktasideQueryData["oppsett"] & {
    title?: string;
    notifikasjoner?: Notifikasjon[];
    snarveier?: Snarvei[];
  };
}
