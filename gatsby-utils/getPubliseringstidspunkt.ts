import { RawFaktasideData } from './createFaktasider';
import { max } from 'date-fns';

export function getPubliseringsTidspunkt(page: RawFaktasideData): Date {
  const delteTekster = page.innhold?.no.filter((block) => block._type === 'deltTekst');
  // @ts-ignore
  const oppdateringsTidspunkter: string[] = [...delteTekster.map((tekst) => tekst._updatedAt), page._updatedAt];

  return max(oppdateringsTidspunkter.map((it) => new Date(it)));
}
