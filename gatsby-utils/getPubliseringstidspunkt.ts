import { RawFaktasideData } from './createFaktasider';
import { max } from 'date-fns';
import { isRawDeltTekst } from '../src/utils/richTextUtils/richTextTypes';
import { SupportedLanguage } from '../src/i18n/supportedLanguages';

export function getPubliseringsTidspunkt(page: RawFaktasideData, lang: SupportedLanguage): string {
  const delteTekster = page.innhold?.[lang]?.filter(isRawDeltTekst) || [];
  const oppdateringsTidspunkter: string[] = [...delteTekster.map((deltTekst) => deltTekst._updatedAt), page._updatedAt];

  return max(oppdateringsTidspunkter.map((it) => new Date(it))).toISOString();
}
