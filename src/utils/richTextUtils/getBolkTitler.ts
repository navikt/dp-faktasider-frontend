import { ParsedRichText } from './parseRichText';
import { isH2Group, SanityBlock } from './richTextTypes';
import { useTranslation } from 'react-i18next';

export function getBolkTitler(parsedRichText?: ParsedRichText, relatertInformasjon?: SanityBlock[]) {
  const { t } = useTranslation('global');

  let bolktitler: string[] = [];

  if (parsedRichText) {
    bolktitler = parsedRichText
      .map((block) => (isH2Group(block) ? block.tittel : undefined))
      .filter((it) => it) as string[];
  }

  if (relatertInformasjon) {
    bolktitler.push(t('relatertInformasjon'));
  }

  return bolktitler;
}
