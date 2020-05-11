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
  _type: 'H2Group';
};

export type H3Group = SanityBlock & {
  tittel: string;
  _type: 'H3Group';
};

export type GraaboksGroup = SanityBlock & {
  _type: 'GraaboksGroup';
};

export type Block = SanityBlock | H2Group | H3Group | GraaboksGroup;

export function isH2Group(bolk: Block): bolk is H2Group {
  return bolk._type === 'H2Group';
}

export function isH3Group(bolk: Block): bolk is H3Group {
  return bolk._type === 'H3Group';
}

export function isGraaBoksGroup(bolk: Block): bolk is GraaboksGroup {
  return bolk._type === 'GraaboksGroup';
}
