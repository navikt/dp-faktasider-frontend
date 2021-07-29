import { SupportedLanguage } from "../../../i18n/supportedLanguages";
import localizeSanityContent from "../../../i18n/localizeSanityContent";
import parseRichText, { ParsedRichText } from "../../../utils/richTextUtils/parser/parseRichText";
import { FaktasideQueryData, LocalizedFaktasideQueryData } from "./faktasideQuery";
import { Notifikasjon } from "../../../components/Notifikasjoner";
import { getPubliseringsTidspunkt } from "../../getPubliseringstidspunkt";
import { Snarvei } from "../forside/forsideQuery";
import getAlleTilpassInnholdValg from "../../../components/faktaside/TilpassInnhold/getAlleTilpassInnholdValg";
import { VisForSituasjon } from "../../../components/BlockContent/VisFor/VisFor";

export interface FaktasideParsedData {
  id: string;
  publiseringsTidspunkt?: string;
  title?: string;
  beskrivelse?: string;
  innhold?: ParsedRichText;
  kortFortalt?: ParsedRichText;
  tilpassInnholdValg: string[];
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
  situasjonsvalg: VisForSituasjon[];
}

export function parseFaktasideData(data: FaktasideQueryData, lang: SupportedLanguage): FaktasideParsedData {
  const localizedPage: LocalizedFaktasideQueryData = localizeSanityContent(data, lang);
  const parsedInnhold = parseRichText(localizedPage.faktaside?.innhold);
  const parsedKortFortalt = parseRichText(localizedPage.faktaside?.kortFortalt);
  const publiseringsTidspunkt = getPubliseringsTidspunkt(localizedPage);
  const relevanteSnarveier = localizedPage.oppsett.snarveier?.filter((snarvei) =>
    snarvei.visPaaSider?.some((side) => side === data.faktaside.id)
  );
  const situasjonsvalg = localizedPage.situasjonsvalg || [];

  return {
    ...localizedPage.oppsett,
    ...localizedPage.faktaside,
    innhold: parsedInnhold,
    kortFortalt: parsedKortFortalt,
    tilpassInnholdValg: getAlleTilpassInnholdValg(situasjonsvalg, parsedKortFortalt, parsedInnhold),
    publiseringsTidspunkt,
    notifikasjoner: localizedPage.notifikasjoner,
    rawData: data,
    domainTitle: localizedPage.oppsett.title,
    snarveier: relevanteSnarveier,
    situasjonsvalg: situasjonsvalg,
  };
}
