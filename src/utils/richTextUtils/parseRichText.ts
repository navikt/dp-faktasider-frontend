import { Block, SanityBlock } from './richTextTypes';

export type ParsedRichText = Block[];

export function parseBlocksTilBolker(blocks: SanityBlock[]): ParsedRichText {
  let newBlocks: Block[] = [];
  let currentBolk: Block | undefined = undefined;

  blocks.forEach((block) => {
    if (block.style === 'h2') {
      currentBolk = {
        _type: 'bolk',
        children: [],
        tittel: block.children[0]?.text,
      };
      newBlocks.push(currentBolk);
    } else if (currentBolk) {
      currentBolk.children.push(block);
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
