import { SupportedLanguage, supportedLanguages } from "../../../i18n/supportedLanguages";
import {
  MenuQueryData,
  MenylenkeEkstern,
  MenylenkeInternRaw,
  MenyLenkeRaw,
  TranslatedMenuDataSide,
  TranslatedMenuQueryData,
} from "./menuQuery";
import localizeSanityContent from "../../../i18n/localizeSanityContent";

export interface MenylenkeInternParsed {
  path: string;
  tittel: string;
  språk: SupportedLanguage;
  tilgjengeligPåValgtSpråk: boolean;
  beskrivelse: string;
  nokkelordBeskrivelse: string;
  pageId: string;
  _type: "menylenkeIntern";
}

export type MenuItem = MenylenkeEkstern | MenylenkeInternParsed;

export function parseMenuData(data: MenuQueryData, lang: SupportedLanguage): MenuItem[] {
  const localizedMenuData = localizeSanityContent(data, lang) as TranslatedMenuQueryData;

  const lenker = Array.isArray(localizedMenuData.lenker) ? localizedMenuData.lenker : [];
  const sider = localizedMenuData.sider || [];

  const sortedMenuLinks = lenker.map((lenke) =>
    isInternLenke(lenke)
      ? createInternalLinkData(sider?.find((page) => page.id === lenke.pageId) as TranslatedMenuDataSide, lang)
      : lenke
  );

  return [...sortedMenuLinks];
}

function isInternLenke(lenke: MenyLenkeRaw): lenke is MenylenkeInternRaw {
  return lenke._type === "reference" && lenke.referenceType === "faktaSide";
}

export function createInternalLinkData(page: TranslatedMenuDataSide, lang: SupportedLanguage): MenylenkeInternParsed {
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
    pageId: page.id,
    _type: "menylenkeIntern",
  };
}
