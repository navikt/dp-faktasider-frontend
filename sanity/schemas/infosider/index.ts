import richText from "./richText/richText";
import faktaSide from "./faktaside/faktaSide";
import customComponent from "./richText/customComponent";
import video from "../video/video";
import fremhevetRichText from "./fremhevetTekst/fremhevetRichText";
import fremhevetTekst from "./fremhevetTekst/fremhevetTekst";
import visSprakversjon from "./faktaside/visSprakversjon";
import visFor from "./richText/annotations/visFor";
import oppsett from "./oppsett/oppsett";
import deltTekst from "./deltTekst/deltTekst";
import deltTekstReference from "./deltTekst/deltTekstReference";
import deltRichText from "./deltTekst/deltRichText";
import deltFremhevetTekst from "./deltTekst/deltFremhevetTekst";
import deltFremhevetRichText from "./deltTekst/deltFremhevetRichText";
import tileggsInformasjon from "./tillegsinfo/tileggsInformasjon";
import tilleggsInfoRichText from "./tillegsinfo/tilleggsInfoRichText";
import kortFortaltRichText from "./faktaside/kortFortaltRichText";
import snarvei from "./oppsett/snarvei";
import menyLenkeEkstern from "./oppsett/menylenkeEkstern";
import tidslinjeRichText from "./tidslinje/tidslinjeRichText";
import tidslinje from "./tidslinje/tidslinje";
import localize from "../utils/localize";

export const infosideSchemas = [
  richText,
  faktaSide,
  customComponent,
  video,
  fremhevetRichText,
  fremhevetTekst,
  visSprakversjon,
  visFor,
  oppsett,
  deltTekst,
  deltTekstReference,
  deltRichText,
  deltFremhevetTekst,
  deltFremhevetRichText,
  tileggsInformasjon,
  tilleggsInfoRichText,
  kortFortaltRichText,
  snarvei,
  menyLenkeEkstern,
  tidslinjeRichText,
  tidslinje,
  localize("notifikasjonRichText"),
  localize("kortFortaltRichText"),
  localize("richText"),
  localize("deltRichText"),
];