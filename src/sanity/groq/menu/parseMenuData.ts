import { SupportedLanguage, supportedLanguages } from "../../../i18n/supportedLanguages";
import {
  isSanityInternLenke,
  MenuQueryData,
  SanityEksternLenke,
  TranslatedMenuDataSide,
  TranslatedMenuQueryData,
} from "./menuQuery";
import localizeSanityContent from "../../../i18n/localizeSanityContent";
import { ExternalMenuLinkData, InternalMenuLinkData, MenuItem } from "./menuDataUtils";

export type MenuParsedData = MenuItem[];

export function parseMenuData(data: MenuQueryData, lang: SupportedLanguage): MenuParsedData {
  const localizedMenuData = localizeSanityContent(data, lang) as TranslatedMenuQueryData;

  const lenker = Array.isArray(localizedMenuData.lenker) ? localizedMenuData.lenker : [];
  const sider = localizedMenuData.sider || [];

  const sortedMenuLinks = lenker.map((lenke) => {
    if (isSanityInternLenke(lenke)) {
      return createInternalLinkData(sider?.find((page) => page.id === lenke.id) as TranslatedMenuDataSide, lang);
    }
    return createExternalLinkData(lenke);
  });

  const unsortedLinks: InternalMenuLinkData[] = sider
    .filter((page) => !sortedMenuLinks.some((link) => link.type === "internal" && link.id === page.id))
    .map((page) => createInternalLinkData(page, lang));

  return [...sortedMenuLinks, ...unsortedLinks];
}

export function createInternalLinkData(page: TranslatedMenuDataSide, lang: SupportedLanguage): InternalMenuLinkData {
  const slug = page.slug;
  const oversettelser = supportedLanguages.filter((lang) => page.visSprakversjon?.[lang]);
  const tilgjengeligPåValgtSpråk = oversettelser.includes(lang);

  return {
    tilgjengeligPåValgtSpråk,
    språk: tilgjengeligPåValgtSpråk ? lang : oversettelser[0],
    path: `/${slug}/`,
    tittel: page.title || "Mangler tittel",
    beskrivelse: page.beskrivelse || "",
    nokkelordBeskrivelse: page.nokkelordBeskrivelse || "",
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
