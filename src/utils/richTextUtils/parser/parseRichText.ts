import { Block, SanityBlock } from "../richTextTypes";
import { flattenH2Versions } from "./flattenH2Versions/flattenH2Versions";
import { groupParser } from "./groupParser/groupParser";
import { makeUniqeHashLinkIDs } from "./makeUniqeGroupIDs/makeUniqeHashLinkIDs";
import { parseDelteTekster } from "./parseDelteTekster/parseDelteTekster";
import fjernOverflodigDokumentData from "./fjernOverflodigDokumentData/fjernOverflodigDokumentData";

export type ParsedRichText = Block[];
export type RichTextParser = (blocks: Block[]) => Block[];

function parseRichText(blocks?: SanityBlock[]): ParsedRichText {
  if (!blocks) {
    return [];
  }

  const parsers: RichTextParser[] = [
    fjernOverflodigDokumentData,
    parseDelteTekster,
    flattenH2Versions,
    makeUniqeHashLinkIDs,
    groupParser,
  ];

  return parsers.reduce((prevBlocks, parser) => parser(prevBlocks), blocks);
}

export default parseRichText;
