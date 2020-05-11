import { Avsnitt, Block, Bolk, SanityBlock } from './richTextTypes';

export type ParsedRichText = Block[];

export function parseBlocksTilBolker(blocks: SanityBlock[]): ParsedRichText {
  let newBlocks: Block[] = [];
  let currentBolk: Bolk | undefined = undefined;

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

export function parseBlocksTilAvsnitt(blocks: SanityBlock[]): ParsedRichText {
  let newBlocks: Block[] = [];
  let currentAvsnitt: Avsnitt | undefined = undefined;

  blocks.forEach((block) => {
    if (block.style === 'h3') {
      currentAvsnitt = {
        _type: 'avsnitt',
        children: [],
        tittel: block.children[0]?.text,
      };
      newBlocks.push(currentAvsnitt);
    } else if (block.style === 'h2') {
      currentAvsnitt = undefined;
      newBlocks.push(block);
    } else if (currentAvsnitt) {
      currentAvsnitt.children.push(block);
    } else {
      newBlocks.push(block);
    }
  });

  return newBlocks;
}

function parseRichText(richText) {
  return parseBlocksTilBolker(parseBlocksTilAvsnitt(richText));
}

export default parseRichText;
