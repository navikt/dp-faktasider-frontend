import { Translations } from '../../types/translations';
import { SupportedLanguage, supportedLanguages } from '../../i18n/supportedLanguages';
import localizeSanityContent from '../../i18n/localizeSanityContent';
import { Oppsett, RawFaktasideData } from '../../../gatsby-utils/createFaktasider';

export interface RawFaktasideSummary {
  title?: Translations<string>;
  ingress?: Translations<string>;
  visSprakversjon?: Translations<boolean | null>;
  id: string;
  slug?: {
    current: string;
  };
}

export interface FaktasideSummary {
  path: string;
  tittel: string;
  språk: SupportedLanguage;
  tilgjengeligPåValgtSpråk: boolean;
  ingress: string;
  id: string;
}

function createFaktasideSummaries(
  faktasider: RawFaktasideData[],
  oppsett: Oppsett,
  lang: SupportedLanguage
): FaktasideSummary[] {
  const sorteringsMal: string[] = oppsett.faktasideSortering.map((it) => it.id);
  const sortedPages: RawFaktasideSummary[] = sorteringsMal.map(
    (id) => faktasider.find((page) => page.id === id) as RawFaktasideSummary
  );
  const unsortedPages = faktasider.filter((page) => !sorteringsMal.includes(page.id));

  return [...sortedPages, ...unsortedPages].map((page) => createFaktasideSummary(page, lang));
}

export function createFaktasideSummary(page: RawFaktasideSummary, lang: 'en' | 'no') {
  const slug = page.slug?.current;
  const oversettelser = supportedLanguages.filter((lang) => page.visSprakversjon?.[lang]);
  const tilgjengeligPåValgtSpråk = oversettelser.includes(lang);
  const språk = tilgjengeligPåValgtSpråk ? lang : oversettelser[0];
  const path = `/${språk}/${slug}/`;
  const tittel = localizeSanityContent(page.title, lang) as string;
  const ingress = localizeSanityContent(page.ingress, lang) as string;

  return {
    path,
    tittel,
    språk,
    tilgjengeligPåValgtSpråk,
    ingress,
    id: page.id,
  };
}

export default createFaktasideSummaries;
