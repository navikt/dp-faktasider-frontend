import { RawFaktasideData } from '../../../gatsby-utils/createFaktasider';
import { Modify } from '../typeUtils';

export type VisForConfig = { [key: string]: boolean | string | undefined };
export type VisPaaConfig = string[];

export type MarkDef = {
  _key: string;
  _type: string;
  visFor?: VisForConfig;
  visPaaSider?: RawFaktasideData[];
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
  listItem?: 'bullet';
};

export type DeltTekst = Modify<
  SanityBlock,
  {
    _createdAt: string;
    _updatedAt: string;
    id: string;
    innhold?: SanityBlock[];
    _type: 'deltTekst';
  }
>;

export type DelttekstReference = {
  _type: 'deltTekstReference';
  deltTekst?: DeltTekst;
};

export type BlockConfigFromParser = {
  meny?: boolean;
  noBackground?: boolean;
  visFor?: VisForConfig;
  visPaaSider?: VisPaaConfig;
  erUtkast?: boolean;
  id?: string;
};

export type ParsedSanityBlock = SanityBlock & {
  blockConfig?: BlockConfigFromParser;
};

export type Tillegsinformasjon = ParsedSanityBlock & {
  _type: 'tileggsInformasjon';
  title: string;
  innhold: SanityBlock[];
};

export type GroupTypes = 'h2' | 'h3' | 'h4';

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export type Block = SanityBlock | Group | ParsedSanityBlock;

export type Group = ParsedSanityBlock & {
  title: string;
  children: Block[];
  _type: 'group';
  style: GroupTypes;
};

export function isGroup(block: Block): block is Group {
  return block._type === 'group';
}

export function isH2Group(block: Block): block is Group {
  return isGroup(block) && block.style === 'h2';
}

export function isH3Group(block: Block): block is Group {
  return isGroup(block) && block.style === 'h3';
}

export function isDeltTekstReference(candidate: Block): candidate is DelttekstReference {
  return candidate._type === 'deltTekstReference';
}

export function isTillegsinformajon(candidate: Block): candidate is Tillegsinformasjon {
  return candidate._type === 'tileggsInformasjon';
}
