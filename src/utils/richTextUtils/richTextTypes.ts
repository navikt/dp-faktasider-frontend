// SanityBlock-typen er uhøytidelig hamret sammen basert på hvilke parametere jeg ser i consollen, det er ikke sikkert den stemmer helt
export type SanityBlock = {
  _key?: string;
  _type?: string;
  children?: SanityBlock[];
  style?: string;
  text?: string;
};

export type H2Group = SanityBlock & {
  tittel: string;
  noBackground: boolean;
  meny: boolean;
  children: SanityBlock[];
  _type: 'H2Group';
};

export type H3Group = SanityBlock & {
  tittel: string;
  children: SanityBlock[];
  _type: 'H3Group';
};

export type Block = SanityBlock | H2Group | H3Group;

export function isH2Group(bolk: Block): bolk is H2Group {
  return bolk._type === 'H2Group';
}

export function isH3Group(bolk: Block): bolk is H3Group {
  return bolk._type === 'H3Group';
}
