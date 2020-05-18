import { H3Group, Block, H2Group, SanityBlock } from './richTextTypes';

export type ParsedRichText = Block[];

/*
 Konseptuell forklaring av parser:

 Fra:
 Hei h2,
 på h3,
 deg,
 og h3,
 meg,
 Du h2,
 er,
 grei

 Til:
 Hei
   på
     deg
   og
     meg
 Du
   er
   grei

*/

export function parseBlocksToRichText(blocks: SanityBlock[]): ParsedRichText {
  let newBlocks: Block[] = [];
  let currentH2Group: H2Group | undefined;
  let currentH3Group: H3Group | undefined;

  blocks.forEach((block) => {
    const style = block.style;
    if (style && ['h2', 'h2-no-background', 'h2-m-meny'].includes(style)) {
      currentH2Group = {
        _type: 'H2Group',
        children: [],
        tittel: block.children?.[0].text || 'Mangler tittel',
        noBackground: style === 'h2-no-background',
        meny: style === 'h2-m-meny',
      };
      currentH3Group = undefined;
      newBlocks.push(currentH2Group);
    } else if (style === 'h3') {
      currentH3Group = {
        _type: 'H3Group',
        children: [],
        tittel: block.children?.[0].text || 'Mangler tittel',
      };
      if (currentH2Group) {
        currentH2Group.children.push(currentH3Group);
      } else {
        newBlocks.push(currentH3Group);
      }
    } else if (currentH3Group) {
      currentH3Group.children.push(block);
    } else if (currentH2Group) {
      currentH2Group.children.push(block);
    } else {
      newBlocks.push(block);
    }
  });

  return newBlocks;
}

function parseRichText(blocks?: SanityBlock[]): ParsedRichText | undefined {
  if (!blocks) {
    return undefined;
  }

  return parseBlocksToRichText(blocks);
}

export default parseRichText;
