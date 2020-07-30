import { graphql, useStaticQuery } from 'gatsby';
import { useLocale } from '../../i18n/LocaleContext';
import { Translations } from '../../types/translations';
import { SupportedLanguage, supportedLanguages } from '../../i18n/supportedLanguages';
import localizeSanityContent from '../../i18n/localizeSanityContent';
import { useTestContext } from '../../testUtils/TestProvider';

interface Side {
  title?: Translations<string>;
  ingress?: Translations<string>;
  visSprakversjon?: Translations<boolean>;
  id: string;
  slug?: {
    current: string;
  };
}

export interface MenuItemData {
  path: string;
  tittel: string;
  språk: SupportedLanguage;
  tilgjengeligPåValgtSpråk: boolean;
  ingress: string;
  id: string;
}

interface GraphQlData {
  oppsett: {
    faktasideSortering: Array<{
      id: string;
    }>;
  };
  pages: {
    edges: Array<{
      node: Side;
    }>;
  };
}

export const faktaSideMenyDataQuery = graphql`
  query MenuData {
    oppsett: sanityOppsett {
      faktasideSortering {
        id
      }
    }
    pages: allSanityFaktaSide {
      edges {
        node {
          title: _rawTitle
          ingress: _rawIngress
          visSprakversjon: _rawVisSprakversjon
          id
          slug {
            current
          }
        }
      }
    }
  }
`;

export function createMenuItemsData(data: GraphQlData, lang: SupportedLanguage): MenuItemData[] {
  const sorteringsMal: string[] = data?.oppsett.faktasideSortering.map((edge) => edge?.id);
  const pages = data?.pages.edges.map((edge) => edge.node) as Side[];
  const sortedPages = sorteringsMal.map((id) => pages.find((page) => page.id === id)) as Side[];
  const unsortedPages = pages.filter((page) => !sorteringsMal.includes(page.id));

  return [...sortedPages, ...unsortedPages].map((page) => {
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
  });
}

function useFaktasiderMenuData(): MenuItemData[] {
  const data: GraphQlData = useStaticQuery(faktaSideMenyDataQuery);
  const lang = useLocale();
  const testContext = useTestContext();

  if (testContext.isTest) {
    return testContext.menuData;
  }

  return createMenuItemsData(data, lang);
}

export default useFaktasiderMenuData;
