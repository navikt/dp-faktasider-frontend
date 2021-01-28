import { ExternalMenuLinkData, InternalMenuLinkData, MenuItem } from "../menuDataUtils";
import { SupportedLanguage, supportedLanguages } from "../../../i18n/supportedLanguages";
import { isSanityInternLenke, MenuDataSide, MenuQueryData, SanityEksternLenke } from "./menuQuery";
import localizeSanityContent from "../../../i18n/localizeSanityContent";

export type ParsedMenuData = MenuItem[];

export function parseMenuData(data: MenuQueryData, lang: SupportedLanguage): ParsedMenuData {
  const { sider, lenker } = localizeSanityContent(data, lang) as MenuQueryData;

  const sortedMenuLinks = lenker.map((lenke) => {
    if (isSanityInternLenke(lenke)) {
      return createInternalLinkData(sider.find((page) => page.id === lenke.id) as MenuDataSide, lang);
    }
    return createExternalLinkData(lenke);
  });

  const unsortedLinks: InternalMenuLinkData[] = sider
    .filter((page) => !sortedMenuLinks.some((link) => link.type === "internal" && link.id === page.id))
    .map((page) => createInternalLinkData(page, lang));

  return [...sortedMenuLinks, ...unsortedLinks];
}

export function createInternalLinkData(page: MenuDataSide, lang: SupportedLanguage): InternalMenuLinkData {
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
