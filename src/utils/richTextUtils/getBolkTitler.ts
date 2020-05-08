import { ParsedRichText } from './parseRichText';
import { isBolk } from './richTextTypes';

export function getBolkTitler(parsedRichText: ParsedRichText) {
  return parsedRichText.map((block) => (isBolk(block) ? block.tittel : undefined)).filter((it) => it);
}
