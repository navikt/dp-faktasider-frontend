import { Block, SanityBlock } from '../richTextTypes';
import { flattenH2Versions } from './flattenH2Versions';
import { groupParser } from './groupParser';
import { makeUniqeGroupIDs } from './makeUniqeGroupIDs';

export type ParsedRichText = Block[];
export type RichTextParser = (blocks: Block[]) => Block[];

function parseRichText(blocks?: SanityBlock[]): ParsedRichText {
  if (!blocks) {
    return [];
  }

  const parsers: RichTextParser[] = [flattenH2Versions, makeUniqeGroupIDs, groupParser];
  return parsers.reduce((prevBlocks, parser) => parser(prevBlocks), blocks);
}

export default parseRichText;
