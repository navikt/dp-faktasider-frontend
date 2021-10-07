import { groq } from "next-sanity";
import { Translations } from "../../../types/translations";
import { SanityBlock } from "../../../utils/richTextUtils/richTextTypes";
import { Notifikasjon } from "../../../components/Notifikasjoner";
import { Snarvei } from "../forside/forsideQuery";
import { SanityImage } from "../../types";
import { VisForSituasjon } from "../../../components/BlockContent/VisFor/VisFor";

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
    seoImage,
    title,
    folketrygdensGrunnbellop,
    snarveier
  },
  'situasjonsvalg': *[_type == "situasjon"],
  'notifikasjoner': *[_type == "notifikasjon" && *[_type == "faktaSide" && slug.current == $slug][0]._id in visPaaFaktaSider]
}`;

export interface IFaktaside {
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
}

export interface FaktasideQueryData {
  faktaside: IFaktaside | null;
  oppsett: {
    seoImage?: SanityImage;
    title?: Translations<string>;
    folketrygdensGrunnbellop?: number;
    snarveier?: Snarvei[];
  };
  situasjonsvalg?: { _id: string; name: Translations<string> }[];
  notifikasjoner?: Notifikasjon[];
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
    snarveier?: Snarvei[];
  };
  situasjonsvalg?: VisForSituasjon[];
  notifikasjoner?: Notifikasjon[];
}
