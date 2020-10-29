import { SanityBlock } from './richTextTypes';

export function getTextFromSanityBlock(block: SanityBlock): string {
  return block.children?.map((it) => it.text).join('') || '';
}
