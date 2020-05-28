import { ParsedRichText } from './parseRichText';
import { H2Group, isH2Group, SanityBlock } from './richTextTypes';
import { useTranslation } from 'react-i18next';

export function getBolkTitler(parsedRichText?: ParsedRichText, relatertInformasjon?: SanityBlock[]) {
  const { t } = useTranslation('global');

  let bolktitler: string[] = [];

  if (parsedRichText) {
    bolktitler = parsedRichText
      .filter((block) => isH2Group(block) && !block.erUtkast)
      .map((block) => (block as H2Group).tittel);
  }

  if (relatertInformasjon) {
    bolktitler.push(t('relatertInformasjon'));
  }

  return bolktitler;
}
