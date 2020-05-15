import { ParsedRichText } from './parseRichText';
import { isH2Group } from './richTextTypes';

export function getBolkTitler(parsedRichText?: ParsedRichText) {
  if (!parsedRichText) {
    return [];
  }
  return parsedRichText.map((block) => (isH2Group(block) ? block.tittel : undefined)).filter((it) => it) as string[];
}
