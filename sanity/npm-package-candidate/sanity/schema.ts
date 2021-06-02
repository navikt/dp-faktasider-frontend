import localize from "./schemas/utils/localize";
import notifikasjon from "./schemas/notifikasjon/notifikasjon";
import notifikasjonRichText from "./schemas/notifikasjon/notifikasjonRichText";
import { infosideSchemas } from "./schemas/infosider";

export default [
  ...infosideSchemas,
  notifikasjon,
  notifikasjonRichText,
  localize("string"),
  localize("text"),
  localize("url"),
];
