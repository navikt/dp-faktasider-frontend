import { Block, SanityBlock } from '../richTextTypes';
import { flattenH2Versions } from './flattenH2Versions/flattenH2Versions';
import { groupParser } from './groupParser/groupParser';
import { makeUniqeGroupIDs } from './makeUniqeGroupIDs/makeUniqeGroupIDs';
import { parseDelteTekster } from './parseDelteTekster/parseDelteTekster';

export type ParsedRichText = Block[];
export type RichTextParser = (blocks: Block[]) => Block[];

function parseRichText(blocks?: SanityBlock[]): ParsedRichText {
  if (!blocks) {
    return [];
  }

  const parsers: RichTextParser[] = [parseDelteTekster, flattenH2Versions, makeUniqeGroupIDs, groupParser];

  return parsers.reduce((prevBlocks, parser) => parser(prevBlocks), blocks);
}

export default parseRichText;
