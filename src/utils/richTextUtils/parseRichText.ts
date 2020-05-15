import { H3Group, Block, H2Group, SanityBlock, isGraaBoksGroup, GraaboksGroup } from './richTextTypes';

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
    if (['h2', 'h2-no-background', 'h2-m-meny'].includes(block.style)) {
      currentH2Group = {
        _type: 'H2Group',
        children: [],
        tittel: block.children[0]?.text,
        noBackground: block.style === 'h2-no-background',
        meny: block.style === 'h2-m-meny',
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

function parseGraaboksToGraaboksGroup(blocks: SanityBlock[]): ParsedRichText {
  let newBlocks: Block[] = [];
  let currentGraaboksGroup: GraaboksGroup | undefined;

  blocks.forEach((block) => {
    if (block._type === 'graaBoks') {
      if (block.startSlutt === 'Start') {
        currentGraaboksGroup = {
          _type: 'GraaboksGroup',
          children: [],
        };
        newBlocks.push(currentGraaboksGroup);
      } else {
        currentGraaboksGroup = undefined;
      }
    } else if (currentGraaboksGroup) {
      currentGraaboksGroup.children.push(block);
    } else {
      newBlocks.push(block);
    }
  });

  newBlocks.map((block) => {
    if (isGraaBoksGroup(block)) {
      return {
        ...block,
        children: parseBlocksToRichText(block.children),
      };
    }
  });

  return newBlocks;
}

function parseRichText(blocks?: SanityBlock[]): ParsedRichText | undefined {
  if (!blocks) {
    return undefined;
  }

  const withGraaboks = parseGraaboksToGraaboksGroup(blocks);
  return parseBlocksToRichText(withGraaboks);
}

export default parseRichText;
