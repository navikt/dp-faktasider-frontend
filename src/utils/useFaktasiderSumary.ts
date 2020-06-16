import { graphql, useStaticQuery } from 'gatsby';
import { useLocale } from '../i18n/LocaleContext';
import { Translations } from '../types/translations';
import { supportedLanguages } from '../i18n/supportedLanguages';
import localizeSanityContent from '../i18n/localizeSanityContent';

interface Side {
  _rawTitle?: Translations<string>;
  _rawIngress?: Translations<string>;
  _rawVisSprakversjon?: Translations<boolean>;
  id: string;
  slug?: {
    current: string;
  };
}

function useOtherPages() {
  const data = useStaticQuery(graphql`
    query OtherPages {
      oppsett: sanityOppsett {
        faktasideSortering {
          id
        }
      }
      pages: allSanityFaktaSide {
        edges {
          node {
            _rawTitle
            _rawIngress
            _rawVisSprakversjon
            id
            slug {
              current
            }
          }
        }
      }
    }
  `);

  const sorteringsMal = data?.oppsett.faktasideSortering.map((edge) => edge?.id);
  const pages = data?.pages.edges.map((edge) => edge.node) as Side[];
  const sortedPages: Side[] = sorteringsMal.map((id) => pages.find((page) => page.id === id));
  const unsortedPages = pages.filter((page) => !sorteringsMal.includes(page.id));

  const lang = useLocale();

  return [...sortedPages, ...unsortedPages].map((page) => {
    const slug = page.slug?.current;
    const oversettelser = supportedLanguages.filter((lang) => page._rawVisSprakversjon?.[lang]);
    const tilgjengeligPåValgtSpråk = oversettelser.includes(lang);
    const språk = tilgjengeligPåValgtSpråk ? lang : oversettelser[0];
    const path = `/${språk}/${slug}/`;
    const tittel = localizeSanityContent(page._rawTitle, lang) as string;
    const ingress = localizeSanityContent(page._rawIngress, lang) as string;

    return {
      path,
      tittel,
      språk,
      tilgjengeligPåValgtSpråk,
      ingress,
    };
  });
}

export default useOtherPages;
