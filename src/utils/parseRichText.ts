export type SanityBlock = {
  _key?: string;
  _type?: string;
  sanityChildren?: SanitySpan[];
  style?: string;
  list?: string;
};

export type SanitySpan = {
  _key?: string;
  _type?: string;
  marks?: string[];
  text?: string;
};

export function parseBlocksTilBolker(blocks: SanityBlock[]): SanityBlock[] {
  let newBlocks: SanityBlock[] = [];
  let currentBolk: SanityBlock | undefined = undefined;

  blocks.forEach((block) => {
    if (block.style === 'h2') {
      currentBolk = {
        _type: 'bolk',
        sanityChildren: [block],
      };
      newBlocks.push(currentBolk);
    } else if (currentBolk) {
      currentBolk.sanityChildren.push(block);
    } else {
      newBlocks.push(block);
    }
  });

  return newBlocks;
}

function parseRichText(richText) {
  return parseBlocksTilBolker(richText);
}

export default parseRichText;
