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

type MarkDef = {
  _type: string;
  visFor?: VisForConfig;
};

type ConfigFromParser = {
  meny?: boolean;
  noBackground?: boolean;
  visFor?: VisForConfig;
  erUtkast?: boolean;
  id?: string;
};

type VisForConfig = { [key: string]: boolean | string };

export type ParsedSanityBlock = SanityBlock & {
  blockConfig?: ConfigFromParser;
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
