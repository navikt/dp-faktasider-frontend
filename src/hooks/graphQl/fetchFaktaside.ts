import { sanityClient } from "../../sanity/sanity-config";
import { groq } from "next-sanity";
import { SupportedLanguage } from "../../i18n/supportedLanguages";
import parseRichText from "../../utils/richTextUtils/parser/parseRichText";
import localizeSanityContent from "../../i18n/localizeSanityContent";
import { getPubliseringsTidspunkt } from "../../gatsby-utils/getPubliseringstidspunkt";
import { FaktasideQueryData, FaktasideParsedData } from "../../components/faktaside/types";
import fetchFaktasiderMenuData from "./fetchFaktasiderMenuData";
import { MenuItem } from "./menuDataUtils";

const innholdFields = `
[] {
  ...,
  defined(deltTekst) => {
    "deltTekst": ^.deltTekst->{...}
  }
}`;

const query = groq`{
  'faktaside': *[_type == "faktaSide" && slug.current == $slug][0] {
    "id": _id,
    "slug": slug.current,
    ...,
    innhold {
      no ${innholdFields},
      en ${innholdFields},
      _type
    }
  },
  'oppsett': *[_id == "oppsett"][0] {
    title,
    folketrygdensGrunnbellop,
    notifikasjoner[]
  }
}`;

export default async function fetchFaktaside(lang: SupportedLanguage, slug: string): Promise<FaktasideParsedData> {
  const data: FaktasideQueryData = await sanityClient.fetch(query, { slug });
  const menuData = await fetchFaktasiderMenuData(lang);

  return createFaktasideContext(data, menuData, lang);
}

export function createFaktasideContext(
  data: FaktasideQueryData,
  menuData: MenuItem[],
  lang: SupportedLanguage
): FaktasideParsedData {
  const localizedPage: FaktasideParsedData = localizeSanityContent(data, lang);
  const parsedInnhold = parseRichText(localizedPage.faktaside?.innhold);
  const parsedKortFortalt = parseRichText(localizedPage.faktaside?.kortFortalt);
  const parsedRelatertInformasjon = parseRichText(localizedPage.faktaside?.relatertInformasjon);
  const publiseringsTidspunkt = getPubliseringsTidspunkt(localizedPage);
  const relevanteNotifikasjoner = localizedPage.oppsett.notifikasjoner?.filter((notifikasjon) =>
    notifikasjon.visPaaSider?.some((side) => side._ref === data.faktaside.id)
  );

  return {
    ...localizedPage,
    faktaside: {
      ...localizedPage.faktaside,
      innhold: parsedInnhold,
      kortFortalt: parsedKortFortalt,
      relatertInformasjon: parsedRelatertInformasjon,
      publiseringsTidspunkt,
    },
    oppsett: {
      ...localizedPage.oppsett,
      notifikasjoner: relevanteNotifikasjoner,
    },
    menuData,
    rawData: data,
  };
}
