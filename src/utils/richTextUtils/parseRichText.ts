import { Block, Group, GroupTypes, PreParsedSanityBlock, SanityBlock } from './richTextTypes';

export type ParsedRichText = Block[];
const groupByStyles: GroupTypes[] = ['h4', 'h3', 'h2']; // Rekkefølgen her er viktig. Den første gruppen vil aldri få andre grupper inni seg.

function parseRichText(blocks?: SanityBlock[]): ParsedRichText {
  if (!blocks) {
    return [];
  }

  const preparsed = preParser(blocks);
  return groupParser(preparsed);
}

function preParser(blocks: SanityBlock[]): PreParsedSanityBlock[] {
  const flattenedH2Versions: PreParsedSanityBlock[] = blocks.flatMap(
    (block): PreParsedSanityBlock => {
      switch (block.style) {
        case 'h2-no-background':
          return {
            ...block,
            style: 'h2',
            preparseConfig: {
              noBackground: true,
            },
          };
        case 'h2-m-meny':
          return {
            ...block,
            style: 'h2',
            preparseConfig: {
              meny: true,
            },
          };
        default:
          return block;
      }
    }
  );

  return flattenedH2Versions;
}

function groupParser(blocks: PreParsedSanityBlock[]): Block[] {
  return groupByStyles.reduce((acc, style) => {
    let parsedBlocks: Block[] = [];
    let currentGroup: Group | undefined = undefined;

    acc.forEach((block) => {
      const startOfNewGroup = block.style === style;
      const startOfHigherLevelGroup = block._type !== 'group' && groupByStyles.includes(block.style as GroupTypes);
      const endOfCurrentGroup = startOfHigherLevelGroup || startOfNewGroup;

      if (endOfCurrentGroup) {
        if (startOfNewGroup) {
          currentGroup = {
            ...block,
            title: getGroupTitle(block),
            _type: 'group',
            groupType: style,
            children: [],
            erUtkast: block.children?.some((child) => child.marks?.includes('utkast')),
            visForConfig: block.markDefs?.find((markDef) => markDef._type === 'visForAnnotation')?.visFor,
          };
          parsedBlocks.push(currentGroup);
        } else {
          currentGroup = undefined;
          parsedBlocks.push(block);
        }
      } else {
        currentGroup ? currentGroup.children.push(block) : parsedBlocks.push(block);
      }
    });

    return parsedBlocks;
  }, blocks);
}

function getGroupTitle(block: PreParsedSanityBlock): string {
  return block.children?.map((it) => it.text).join('') || 'Mangler tittel';
}

export default parseRichText;
