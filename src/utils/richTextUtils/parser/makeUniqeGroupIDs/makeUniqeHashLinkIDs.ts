import { Block, GroupTypes, isTillegsinformajon, ParsedSanityBlock } from "../../richTextTypes";
import { RichTextParser } from "../parseRichText";
import { idFromString } from "../../../idFromString";
import { getTextFromSanityBlock } from "../../getTextFromSanityBlock";

let usedIds: string[] = [];

// gruppe-id'er som bla brukes til hash-lenker må være unike. Id'ene genereres fra gruppetittelen, men det hender at det finnes duplikate gruppetitler på forskjellige nivåer.
// Derfor sørger vi her for at alle gruppe-id'er blir unike selv om det skulle finnes duplikate titler på siden.
// Hvis det finnes duplikate titler vil h2 id'er prioriteres over h3 osv. Det vil si at ved duplikate id'er vil h2 feks få 'min-id' mens h3 vil få 'min-id-2'

const priority: (GroupTypes | "tileggsInformasjon")[] = ["h2", "h3", "h4", "tileggsInformasjon"];

export const makeUniqeHashLinkIDs: RichTextParser = (blocks: Block[]) => {
  usedIds = [];

  return priority.reduce((prevBlocks, currentGroupLevel) => {
    return prevBlocks.map(
      (block): Block => {
        if ([block.style, block._type].includes(currentGroupLevel)) {
          const currentConfig = (block as ParsedSanityBlock)?.blockConfig;
          return {
            ...block,
            blockConfig: {
              ...currentConfig,
              id: makeUniqeId(isTillegsinformajon(block) ? block.title : getTextFromSanityBlock(block)),
            },
          };
        }

        return block;
      }
    );
  }, blocks);
};

function makeUniqeId(title: string, retries = 0) {
  let id = idFromString(title + (retries ? "-" + (retries + 1) : ""));
  if (usedIds.includes(id)) {
    id = makeUniqeId(title, retries + 1);
  }
  usedIds.push(id);
  return id;
}
