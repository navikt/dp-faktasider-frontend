import { Block, SanityBlock } from "../richTextTypes";
import { flattenH2Versions } from "./flattenH2Versions/flattenH2Versions";
import { groupParser } from "./groupParser/groupParser";
import { makeUniqeHashLinkIDs } from "./makeUniqeGroupIDs/makeUniqeHashLinkIDs";
import { parseDelteTekster } from "./parseDelteTekster/parseDelteTekster";

export type RichTextParser = (blocks: Block[]) => Block[];

function parseRichText(blocks?: SanityBlock[]): Block[] {
  if (!blocks) {
    return [];
  }

  const parsers: RichTextParser[] = [parseDelteTekster, flattenH2Versions, makeUniqeHashLinkIDs, groupParser];

  return parsers.reduce((prevBlocks, parser) => parser(prevBlocks), blocks);
}

export default parseRichText;
