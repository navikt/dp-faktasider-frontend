import { ParsedRichText } from './parser/parseRichText';
import { Group, isH2Group, SanityBlock } from './richTextTypes';
import { useTranslation } from 'react-i18next';

export function useBolkTitler(parsedRichText?: ParsedRichText, relatertInformasjon?: SanityBlock[]) {
  const { t } = useTranslation('global');

  let bolktitler: string[] = [];

  if (parsedRichText) {
    bolktitler = parsedRichText
      .filter((block) => isH2Group(block) && !block.config?.erUtkast)
      .map((block) => (block as Group).title);
  }

  if (relatertInformasjon) {
    bolktitler.push(t('relatertInformasjon'));
  }

  return bolktitler;
}
