// SanityBlock-typen er uhøytidelig hamret sammen basert på hvilke parametere jeg ser i consollen, det er ikke sikkert den stemmer helt
export type SanityBlock = {
  _key?: string;
  _type?: string;
  children?: SanityBlock[];
  style?: string;
  list?: string;
  marks?: string[];
  text?: string;
};

export type Bolk = SanityBlock & {
  tittel: string;
  _type: 'bolk';
};

export type Avsnitt = SanityBlock & {
  tittel: string;
  _type: 'avsnitt';
};

export type Block = SanityBlock | Bolk;

export function isBolk(bolk: Block): bolk is Bolk {
  return bolk._type === 'bolk';
}

export function isAvsnitt(bolk: Block): bolk is Avsnitt {
  return bolk._type === 'avsnitt';
}
