import { sanityClient } from "../../../sanity/sanity-config";
import { groq } from "next-sanity";
import { Translations } from "../../types/translations";
import { SanityBlock } from "../../utils/richTextUtils/richTextTypes";
import { Modify } from "../../utils/typeUtils";
import { SupportedLanguage } from "../../i18n/supportedLanguages";
import parseRichText, { ParsedRichText } from "../../utils/richTextUtils/parser/parseRichText";
import { Notifikasjon } from "../../templates/faktaside/Notifikasjoner";
import localizeSanityContent from "../../i18n/localizeSanityContent";
import { getPubliseringsTidspunkt } from "../../../gatsby-utils/getPubliseringstidspunkt";
import fetchNotifikasjoner from "./fetchNotifikasjoner";

export interface RawFaktasideData {
  id: string;
  _updatedAt: string;
  title?: Translations<string>;
  beskrivelse?: Translations<string>;
  innhold?: Translations<SanityBlock[]>;
  kortFortalt?: Translations<SanityBlock[]>;
  relatertInformasjon?: Translations<SanityBlock[]>;
  slug?: {
    current: string;
  };
  visSprakversjon?: {
    en: boolean;
    no: boolean;
  };
  visIngenValgPasser?: boolean;
}

export type LocalizedFaktasideData = Modify<RawFaktasideData,
  {
    title?: string;
    beskrivelse?: string;
    innhold?: SanityBlock[];
    kortFortalt?: SanityBlock[];
    relatertInformasjon?: SanityBlock[];
  }>;

export type FaktasideContext = Modify<Omit<LocalizedFaktasideData, "_updatedAt">,
  {
    lang: SupportedLanguage;
    innhold: ParsedRichText;
    publiseringsTidspunkt: string;
    rawData: Pick<RawFaktasideData, "title">;
    slug: string;
    notifikasjoner?: Notifikasjon[];
    sideTittel: string
  }>;

export default async function fetchFaktaside(lang: SupportedLanguage, slug: string): Promise<FaktasideContext> {
  const query = groq`
  *[_type == "faktaSide" && slug.current == "${slug}"][0] {
    "id": _id,
    ...
  }
  `;

  const oppsettQuery = groq`
    *[_id == "oppsett"][0] {
      title
    }
  `;

  const faktaside = await sanityClient.fetch(query);
  const oppsett = await sanityClient.fetch(oppsettQuery);
  const notifikasjoner = await fetchNotifikasjoner();
  return createFaktasideContext(faktaside, oppsett.title, lang, notifikasjoner);
}

export function createFaktasideContext(
  page: RawFaktasideData,
  tittel: string,
  lang: SupportedLanguage,
  alleNotifikasjoner?: Notifikasjon[]
): FaktasideContext {
  const localizedPage = localizeSanityContent(page, lang) as LocalizedFaktasideData;
  const localizedTitle = localizeSanityContent(tittel, lang);
  const parsedInnhold = parseRichText(localizedPage.innhold);
  const parsedKortFortalt = parseRichText(localizedPage.kortFortalt);
  const publiseringsTidspunkt = getPubliseringsTidspunkt(localizedPage);
  const relevanteNotifikasjoner = alleNotifikasjoner?.filter((notifikasjon) =>
    notifikasjon.visPaaSider?.some((side) => side._ref === page.id)
  );
  const localizedNotifikasjoner = localizeSanityContent(relevanteNotifikasjoner, lang) as Notifikasjon[];

  return {
    ...localizedPage,
    innhold: parsedInnhold,
    kortFortalt: parsedKortFortalt,
    lang,
    slug: page.slug?.current || "N/A",
    publiseringsTidspunkt,
    rawData: {
      title: page.title
    },
    sideTittel: localizedTitle,
    notifikasjoner: localizedNotifikasjoner
  };
}