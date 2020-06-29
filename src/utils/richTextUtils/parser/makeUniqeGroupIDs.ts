import { Block, GroupTypes, ParsedSanityBlock } from '../richTextTypes';
import { RichTextParser } from './parseRichText';
import { getGroupTitle } from './groupParser';
import { idFromString } from '../../idFromString';

// gruppe-id'er som bla brukes til hash-lenker må være unike. Id'ene genereres fra gruppetittelen, men det hender at det finnes duplikate gruppetitler på forskjellige nivåer.
// Derfor sørger vi her for at alle gruppe-id'er blir unike selv om det skulle finnes duplikate titler på siden.
// Hvis det finnes duplikate titler vil h2 id'er prioriteres over h3 osv. Det vil si at ved duplikate id'er vil h2 feks få 'min-id' mens h3 vil få 'min-id-2'

const groupTitlePriority: GroupTypes[] = ['h2', 'h3', 'h4'];

let usedIds: string[] = [];

export const makeUniqeGroupIDs: RichTextParser = (blocks: Block[]) => {
  usedIds = [];

  return groupTitlePriority.reduce((prevBlocks, currentGroupLevel) => {
    return prevBlocks.map(
      (block): Block => {
        if (block.style === currentGroupLevel) {
          const currentConfig = (block as ParsedSanityBlock)?.config;
          return {
            ...block,
            config: {
              ...currentConfig,
              id: makeUniqeId(getGroupTitle(block)),
            },
          };
        }

        return block;
      }
    );
  }, blocks);
};

function makeUniqeId(title: string, retries = 0) {
  let id = idFromString(title + (retries ? '-' + (retries + 1) : ''));
  if (usedIds.includes(id)) {
    id = makeUniqeId(title, retries + 1);
  }
  usedIds.push(id);
  return id;
}
