import { Modify } from "../typeUtils";
import { Group } from "./parser/groupParser/groupParser";

export type VisForConfig = {
  visForSituasjoner?: { _ref: string }[];
  skjulFor?: boolean;
  _type: "visFor";
};

export type VisPaaConfig = string[];

export type MarkDef = {
  _key: string;
  _type: string;
  visFor?: VisForConfig;
  visPaaSider?: { _ref: string }[];
  href?: string;
};

// SanityBlock-typen er uhøytidelig hamret sammen basert på hvilke parametere jeg ser i consollen, det er ikke sikkert den stemmer helt
export type SanityBlock = {
  _key?: string;
  _type: string;
  children?: SanityBlock[];
  style?: string;
  text?: string;
  marks?: string[];
  markDefs?: MarkDef[];
  level?: number;
  listItem?: "bullet";
};

export type DeltTekst = Modify<
  SanityBlock,
  {
    _updatedAt: string;
    innhold?: SanityBlock[];
    _type: "deltTekst";
  }
>;

export type DelttekstReference = {
  _type: "deltTekstReference";
  deltTekst?: DeltTekst;
};

export type BlockConfigFromParser = {
  meny?: boolean;
  nobackground?: boolean;
  visFor?: VisForConfig;
  visPaaSider?: VisPaaConfig;
  erUtkast?: boolean;
  id?: string;
};

export type ParsedSanityBlock = SanityBlock & {
  blockConfig?: BlockConfigFromParser;
};

export type Tillegsinformasjon = ParsedSanityBlock & {
  _type: "tileggsInformasjon";
  title: string;
  innhold: SanityBlock[];
};

export type TidslinjeI = ParsedSanityBlock & {
  _type: "tidslinje";
  innhold: SanityBlock[];
};

export type Block = SanityBlock | Group | ParsedSanityBlock;

export function isDeltTekstReference(candidate: Block): candidate is DelttekstReference {
  return candidate._type === "deltTekstReference";
}

export function isTillegsinformajon(candidate: Block): candidate is Tillegsinformasjon {
  return candidate._type === "tileggsInformasjon";
}
