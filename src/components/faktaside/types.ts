import { SanityBlock } from "../../utils/richTextUtils/richTextTypes";
import { Notifikasjon } from "./Notifikasjoner";
import { Translations } from "../../types/translations";
import { ParsedRichText } from "../../utils/richTextUtils/parser/parseRichText";
import { MenuItem } from "../../hooks/graphQl/menuDataUtils";

export interface FaktasideQueryData {
  faktaside: {
    id?: string;
    _updatedAt?: string;
    title?: Translations<string>;
    beskrivelse?: Translations<string>;
    innhold?: Translations<SanityBlock[]>;
    kortFortalt?: Translations<SanityBlock[]>;
    relatertInformasjon?: Translations<SanityBlock[]>;
    slug?: string;
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
  };
}

export interface FaktasideParsedData {
  faktaside: {
    id?: string;
    publiseringsTidspunkt?: string;
    title?: string;
    beskrivelse?: string;
    innhold?: ParsedRichText;
    kortFortalt?: ParsedRichText;
    relatertInformasjon?: ParsedRichText;
    slug?: string;
    visSprakversjon?: {
      en?: boolean;
      no?: boolean;
    };
    visIngenValgPasser?: boolean;
  };
  oppsett: {
    title?: string;
    folketrygdensGrunnbellop?: number;
    notifikasjoner?: Notifikasjon[];
  };
  menuData: MenuItem[];
  rawData: FaktasideQueryData;
}
