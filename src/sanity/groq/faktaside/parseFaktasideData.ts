import { SupportedLanguage } from "../../../i18n/supportedLanguages";
import localizeSanityContent from "../../../i18n/localizeSanityContent";
import { FaktasideQueryData, LocalizedFaktasideQueryData } from "./faktasideQuery";
import { Notifikasjon } from "../../../components/Notifikasjoner";
import { getPubliseringsTidspunkt } from "../../getPubliseringstidspunkt";
import { Snarvei } from "../forside/forsideQuery";
import { RichText } from "../../../utils/richTextUtils/RichText";
import parseRichText from "../../../utils/richTextUtils/parser/parseRichText";

export interface FaktasideParsedData {
  id: string;
  publiseringsTidspunkt?: string;
  title?: string;
  beskrivelse?: string;
  innhold: RichText;
  kortFortalt: RichText;
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
  const innhold = parseRichText(localizedPage.faktaside?.innhold);
  const kortFortalt = parseRichText(localizedPage.faktaside?.kortFortalt);
  const publiseringsTidspunkt = getPubliseringsTidspunkt(localizedPage);
  const relevanteNotifikasjoner = localizedPage.notifikasjoner?.filter((notifikasjon) =>
    notifikasjon.visPaaFaktaSider?.some((side) => side === data.faktaside.id)
  );
  const relevanteSnarveier = localizedPage.oppsett.snarveier?.filter((snarvei) =>
    snarvei.visPaaSider?.some((side) => side === data.faktaside.id)
  );

  return {
    ...localizedPage.oppsett,
    ...localizedPage.faktaside,
    innhold,
    kortFortalt,
    publiseringsTidspunkt,
    notifikasjoner: relevanteNotifikasjoner,
    rawData: data,
    domainTitle: localizedPage.oppsett.title,
    snarveier: relevanteSnarveier,
  };
}
