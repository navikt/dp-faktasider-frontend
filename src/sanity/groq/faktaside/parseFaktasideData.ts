import { SupportedLanguage } from "../../../i18n/supportedLanguages";
import localizeSanityContent from "../../../i18n/localizeSanityContent";
import parseRichText, { ParsedRichText } from "../../../utils/richTextUtils/parser/parseRichText";
import { FaktasideQueryData, LocalizedFaktasideQueryData } from "./faktasideQuery";
import { Notifikasjon } from "../../../components/Notifikasjoner";
import { getPubliseringsTidspunkt } from "../../getPubliseringstidspunkt";
import { Snarvei } from "../menu/menuQuery";

export interface FaktasideParsedData {
  id: string;
  publiseringsTidspunkt?: string;
  title?: string;
  beskrivelse?: string;
  innhold?: ParsedRichText;
  kortFortalt?: ParsedRichText;
  slug: string;
  visSprakversjon?: {
    en?: boolean;
    no?: boolean;
  };
  visIngenValgPasser?: boolean;
  domainTitle?: string;
  folketrygdensGrunnbellop?: number;
  notifikasjoner?: Notifikasjon[];
  snarveier?: Snarvei[];
  rawData: FaktasideQueryData;
}

export function parseFaktasideData(data: FaktasideQueryData, lang: SupportedLanguage): FaktasideParsedData {
  const localizedPage: LocalizedFaktasideQueryData = localizeSanityContent(data, lang);
  const parsedInnhold = parseRichText(localizedPage.faktaside?.innhold);
  const parsedKortFortalt = parseRichText(localizedPage.faktaside?.kortFortalt);
  const publiseringsTidspunkt = getPubliseringsTidspunkt(localizedPage);
  const relevanteNotifikasjoner = localizedPage.oppsett.notifikasjoner?.filter((notifikasjon) =>
    notifikasjon.visPaaSider?.some((side) => side._ref === data.faktaside.id)
  );
  const relevanteSnarveier = localizedPage.oppsett.snarveier?.filter((snarvei) =>
    snarvei.visPaaSider?.some((side) => side === data.faktaside.id)
  );

  return {
    ...localizedPage.oppsett,
    ...localizedPage.faktaside,
    innhold: parsedInnhold,
    kortFortalt: parsedKortFortalt,
    publiseringsTidspunkt,
    notifikasjoner: relevanteNotifikasjoner,
    rawData: data,
    domainTitle: localizedPage.oppsett.title,
    snarveier: relevanteSnarveier,
  };
}
