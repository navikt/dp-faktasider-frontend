import localize from "./schemas/utils/localize";
import notifikasjon, { NotifikasjonBoolean } from "./schemas/notifikasjon/notifikasjon";
import notifikasjonRichText from "./schemas/notifikasjon/notifikasjonRichText";
import { infosideSchemas } from "./schemas/infosider";

type Config = {
  /*
   * Disse vil vises i drop-down i editor når redaktører ønsker å legge inn en Custom Component.
   * */
  customComponentKeys?: string[];
  /*
   * Mulighet til å legge inn ekstra checkboxer. Feks kan dette brukes til å la redakører huke av for at notifikasjoner skal vises på en tredjepartsside.
   *
   * Du kan da spørre etter relevante notifikasjoner med en groq-query ala `*[_type == "notifikasjon" && minBoolean == true]`
   * */
  ekstraNotifikasjonsBooleans?: NotifikasjonBoolean[];
};

export default (config?: Config) => [
  ...infosideSchemas(config?.customComponentKeys),
  notifikasjon(config?.ekstraNotifikasjonsBooleans),
  notifikasjonRichText,
  localize("string"),
  localize("text"),
  localize("url"),
];
