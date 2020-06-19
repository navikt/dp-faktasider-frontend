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

type PreparseConfig = {
  meny?: boolean;
  noBackground?: boolean;
};

export type PreParsedSanityBlock = SanityBlock & {
  preparseConfig?: PreparseConfig;
};

export type GroupTypes = 'h2' | 'h3' | 'h4';

type VisForConfig = { [key: string]: boolean | string };

export type Group = PreParsedSanityBlock & {
  title: string;
  children: PreParsedSanityBlock[];
  _type: 'group';
  groupType: GroupTypes;
  erUtkast?: boolean;
  visForConfig?: VisForConfig;
};

export type Block = SanityBlock | Group | PreParsedSanityBlock;

export function isGroup(block: Block): block is Group {
  return block._type === 'group';
}

export function isH2Group(block: Block): block is Group {
  return isGroup(block) && block.groupType === 'h2';
}

export function isH3Group(block: Block): block is Group {
  return isGroup(block) && block.groupType === 'h3';
}
