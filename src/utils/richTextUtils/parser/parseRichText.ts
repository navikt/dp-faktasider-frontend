import { Block, SanityBlock } from "../richTextTypes";
import { flattenH2Versions } from "./flattenH2Versions/flattenH2Versions";
import { groupParser } from "./groupParser/groupParser";
import { makeUniqeHashLinkIDs } from "./makeUniqeGroupIDs/makeUniqeHashLinkIDs";
import { parseDelteTekster } from "./parseDelteTekster/parseDelteTekster";
import { RichText } from "../RichText";

export type RichTextParser = (blocks: Block[]) => Block[];

function parseRichText(blocks?: SanityBlock[]): RichText {
  if (!blocks) {
    return new RichText();
  }

  const parsers: RichTextParser[] = [parseDelteTekster, flattenH2Versions, makeUniqeHashLinkIDs, groupParser];

  const parsedText = parsers.reduce((prevBlocks, parser) => parser(prevBlocks), blocks);

  return new RichText(parsedText);
}

export default parseRichText;
