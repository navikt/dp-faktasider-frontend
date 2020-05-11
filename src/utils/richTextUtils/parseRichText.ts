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

export function parseRichText(blocks: SanityBlock[]): ParsedRichText {
  let newBlocks: Block[] = [];
  let currentH2Group: H2Group | undefined;
  let currentH3Group: H3Group | undefined;

  blocks.forEach((block) => {
    if (['h2', 'h2-no-background'].includes(block.style)) {
      currentH2Group = {
        _type: 'H2Group',
        children: [],
        tittel: block.children[0]?.text,
        noBackground: block.style === 'h2-no-background',
      };
      currentH3Group = undefined;
      newBlocks.push(currentH2Group);
    } else if (block.style === 'h3') {
      currentH3Group = {
        _type: 'H3Group',
        children: [],
        tittel: block.children[0]?.text,
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

export default parseRichText;
