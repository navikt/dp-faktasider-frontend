import { EksternLenkeI } from "./useProjectData";
import { SupportedLanguage } from "../../i18n/supportedLanguages";

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

export function isInternal(lenke: MenuItem): lenke is InternalMenuLinkData {
  return lenke.type === "internal";
}
