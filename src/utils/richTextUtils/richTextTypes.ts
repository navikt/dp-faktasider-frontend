import { RawFaktasideData } from '../../../gatsby-utils/createFaktasider';
import { Modify } from '../typeUtils';

// SanityBlock-typen er uhøytidelig hamret sammen basert på hvilke parametere jeg ser i consollen, det er ikke sikkert den stemmer helt
export type SanityBlock = {
  _key?: string;
  _type: string;
  children?: SanityBlock[];
  style?: string;
  text?: string;
  marks?: string[];
  markDefs?: MarkDef[];
};

export type RawDeltTekst = Modify<
  SanityBlock,
  {
    _createdAt: string;
    _updatedAt: string;
    id: string;
    innhold?: SanityBlock[];
    _type: 'deltTekst';
  }
>;

export function isRawDeltTekst(candidate: Block): candidate is RawDeltTekst {
  return candidate._type === 'deltTekst';
}

type MarkDef = {
  _key: string;
  _type: string;
  visFor?: VisForConfig;
  visPaaSider?: RawFaktasideData[];
};

export type BlockConfigFromParser = {
  meny?: boolean;
  noBackground?: boolean;
  visFor?: VisForConfig;
  visPaaSider?: VisPaaConfig;
  erUtkast?: boolean;
  id?: string;
};

export type VisForConfig = { [key: string]: boolean | string };
type VisPaaConfig = string[];

export type ParsedSanityBlock = SanityBlock & {
  blockConfig?: BlockConfigFromParser;
};

export type GroupTypes = 'h2' | 'h3' | 'h4';

export type Group = ParsedSanityBlock & {
  title: string;
  children: Block[];
  _type: 'group';
  style: GroupTypes;
};

export type Block = SanityBlock | Group | ParsedSanityBlock;

export function isGroup(block: Block): block is Group {
  return block._type === 'group';
}

export function isH2Group(block: Block): block is Group {
  return isGroup(block) && block.style === 'h2';
}

export function isH3Group(block: Block): block is Group {
  return isGroup(block) && block.style === 'h3';
}
