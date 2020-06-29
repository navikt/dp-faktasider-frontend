import { Block, Group, GroupTypes, ParsedSanityBlock } from '../richTextTypes';
import { RichTextParser } from './parseRichText';

const groupByStyles: GroupTypes[] = ['h4', 'h3', 'h2']; // Rekkefølgen her er viktig. Den første gruppen vil aldri få andre grupper inni seg.

// Samler tekst i grupper adskilt av titler (h2, h3, h4 etc). h2 er toppnivå og kan ha flere h3 grupper inni seg. h3 kan ha h4-grupper inni seg.
// Å samle bolkene slik gjør det lett å feks style en bolk med tekst og det legger til rette for å lage dokumenter med god semantikk/accessibility ved å legge bolker i <section> / <article> etc.
export const groupParser: RichTextParser = (blocks) => {
  return groupByStyles.reduce((acc, groupDivider) => {
    const higherLevelGroupDividers = groupByStyles.slice(groupByStyles.indexOf(groupDivider) + 1);
    let parsedBlocks: Block[] = [];
    let currentGroup: Group | undefined = undefined;

    acc.forEach((block) => {
      const startOfNewGroup = block.style === groupDivider;
      const startOfHigherLevelGroup = higherLevelGroupDividers.includes(block.style as GroupTypes);
      const endOfCurrentGroup = startOfHigherLevelGroup || startOfNewGroup;

      if (endOfCurrentGroup) {
        if (startOfNewGroup) {
          const currentConfig = (block as ParsedSanityBlock)?.config || {};
          currentGroup = {
            ...block,
            title: getGroupTitle(block),
            _type: 'group',
            children: [],
            config: {
              ...currentConfig,
              erUtkast: block.children?.some((child) => child.marks?.includes('utkast')),
              visFor: block.markDefs?.find((markDef) => markDef._type === 'visForAnnotation')?.visFor,
            },
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
};

function getGroupTitle(block: ParsedSanityBlock): string {
  return block.children?.map((it) => it.text).join('') || 'Mangler tittel';
}
