import { SupportedLanguage, supportedLanguages } from "../../i18n/supportedLanguages";
import localizeSanityContent from "../../i18n/localizeSanityContent";
import { ExternalMenuLinkData, InternalMenuLinkData, MenuItem } from "./menuDataUtils";
import { groq } from "next-sanity";
import { sanityClient } from "../../sanity/sanity-config";

interface Side {
  title?: string;
  beskrivelse?: string;
  nokkelordBeskrivelse?: string;
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
  _type: "reference";
  referenceType: "faktaSide";
  id: string;
}

interface SanityEksternLenke {
  _type: "eksternLenke";
  url: string;
  tittel: string;
  beskrivelse: string;
}

type Lenke = SanityInternLenke | SanityEksternLenke;

function isSanityInternLenke(lenke: Lenke): lenke is SanityInternLenke {
  return lenke._type === "reference" && lenke.referenceType === "faktaSide";
}

interface SanityData {
  lenker: Lenke[];
  pages: Side[];
}


const lenkeQuery = groq`
*[_id == "oppsett"][0] {
  sideoversiktLenker[] {
   ...,
    defined(_ref) => {
      "id": @-> _id,
      "referenceType": @-> _type
    }
  }
}
`;

const pagesQuery = groq`
*[_type == "faktaSide"] {
  title,
  beskrivelse,
  nokkelordBeskrivelse,
  visSprakversjon,
  "id": _id,
  slug
}
`;


export function createMenuItemsData(data: SanityData, lang: SupportedLanguage): MenuItem[] {
  const { pages, lenker } = localizeSanityContent(data, lang) as SanityData;

  const sortedMenuLinks = lenker.map((lenke) => {
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
  const nokkelordBeskrivelse = page.nokkelordBeskrivelse || "";

  return {
    path,
    tittel,
    beskrivelse,
    nokkelordBeskrivelse,
    språk,
    tilgjengeligPåValgtSpråk,
    id: page.id,
    type: "internal"
  };
}

function createExternalLinkData(lenke: SanityEksternLenke): ExternalMenuLinkData {
  return {
    url: lenke.url,
    tittel: lenke.tittel,
    beskrivelse: lenke.beskrivelse,
    type: "external"
  };
}

async function fetchFaktasiderMenuData(lang: SupportedLanguage): Promise<MenuItem[]> {
  const lenker: { sideoversiktLenker: Lenke[] } = await sanityClient.fetch(lenkeQuery);
  const pages: Side[] = await sanityClient.fetch(pagesQuery);

  return createMenuItemsData({ lenker: lenker.sideoversiktLenker, pages }, lang);
}

export default fetchFaktasiderMenuData;
