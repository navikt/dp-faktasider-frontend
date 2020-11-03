import { graphql, useStaticQuery } from "gatsby";
import { useLocale } from "../../i18n/LocaleContext";
import { SupportedLanguage, supportedLanguages } from "../../i18n/supportedLanguages";
import localizeSanityContent from "../../i18n/localizeSanityContent";
import { useTestContext } from "../../testUtils/TestProvider";
import { ExternalMenuLinkData, InternalMenuLinkData, MenuItem } from "./menuDataUtils";

interface Side {
  title?: string;
  beskrivelse?: string;
  visSprakversjon?: {
    no: boolean;
    en: boolean;
  };
  id: string;
  slug?: {
    current: string;
  };
}

interface SanityInternLenke {
  _type: "faktaSide";
  id: string;
}

interface SanityEksternLenke {
  _type: "eksternLenke";
  url: string;
  tittel: string;
  beskrivelse: string;
}

function isSanityInternLenke(lenke: SanityInternLenke | SanityEksternLenke): lenke is SanityInternLenke {
  return lenke._type === "faktaSide";
}

interface GraphQlData {
  oppsett: {
    sideoversiktLenker: Array<SanityInternLenke | SanityEksternLenke>;
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
      sideoversiktLenker {
        ... on SanityFaktaSide {
          id
          _type
        }
        ... on SanityEksternLenke {
          _type
          url: _rawUrl
          tittel: _rawTittel
          beskrivelse: _rawBeskrivelse
        }
      }
    }
    pages: allSanityFaktaSide {
      edges {
        node {
          title: _rawTitle
          beskrivelse: _rawBeskrivelse
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

export function createMenuItemsData(data, lang: SupportedLanguage): MenuItem[] {
  const localizedData = localizeSanityContent(data, lang) as GraphQlData;
  const pages = localizedData?.pages.edges.map((edge) => edge.node) as Side[];

  const sortedMenuLinks = localizedData?.oppsett.sideoversiktLenker.map((lenke) => {
    if (isSanityInternLenke(lenke)) {
      return createInternalLinkData(pages.find((page) => page.id === lenke.id) as Side, lang);
    }
    return createExternalLinkData(lenke);
  });

  const unsortedLinks: InternalMenuLinkData[] = pages
    .filter((page) => !sortedMenuLinks.some((link) => link.type === "internal" && link.id === page.id))
    .map((page) => createInternalLinkData(page, lang));

  return [...sortedMenuLinks, ...unsortedLinks];
}

function createInternalLinkData(page: Side, lang: SupportedLanguage): InternalMenuLinkData {
  const slug = page.slug?.current;
  const oversettelser = supportedLanguages.filter((lang) => page.visSprakversjon?.[lang]);
  const tilgjengeligPåValgtSpråk = oversettelser.includes(lang);
  const språk = tilgjengeligPåValgtSpråk ? lang : oversettelser[0];
  const path = `/${språk}/${slug}/`;
  const tittel = page.title || "Mangler tittel";
  const beskrivelse = page.beskrivelse || "";

  return {
    path,
    tittel,
    beskrivelse,
    språk,
    tilgjengeligPåValgtSpråk,
    id: page.id,
    type: "internal",
  };
}

function createExternalLinkData(lenke: SanityEksternLenke): ExternalMenuLinkData {
  return {
    url: lenke.url,
    tittel: lenke.tittel,
    beskrivelse: lenke.beskrivelse,
    type: "external",
  };
}

function useFaktasiderMenuData(): MenuItem[] {
  const data: GraphQlData = useStaticQuery(faktaSideMenyDataQuery);
  const lang = useLocale();
  const testContext = useTestContext();

  if (testContext.isTest) {
    return testContext.menuData;
  }

  return createMenuItemsData(data, lang);
}

export default useFaktasiderMenuData;
