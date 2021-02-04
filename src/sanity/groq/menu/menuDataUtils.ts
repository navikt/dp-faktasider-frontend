import { SupportedLanguage } from "../../../i18n/supportedLanguages";
import { EksternLenkeI } from "../forside/parseForsideData";

export interface ExternalMenuLinkData extends EksternLenkeI {
  type: "external";
}

export interface InternalMenuLinkData {
  path: string;
  tittel: string;
  språk: SupportedLanguage;
  tilgjengeligPåValgtSpråk: boolean;
  beskrivelse: string;
  nokkelordBeskrivelse: string;
  id: string;
  type: "internal";
}

export type MenuItem = ExternalMenuLinkData | InternalMenuLinkData;
