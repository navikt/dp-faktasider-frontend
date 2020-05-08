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

export type Block = SanityBlock | Bolk;

export function isBolk(bolk: Block): bolk is Bolk {
  return bolk._type === 'bolk';
}
