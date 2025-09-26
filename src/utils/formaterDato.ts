import { format } from "date-fns";
import nb from "date-fns/locale/nb";

export function formaterDato(dato: string) {
  return format(new Date(dato), "PPpp", { locale: nb });
}

export function formaterTilTallDato(dato: string) {
  return format(new Date(dato), "yyyy-MM-dd_HH-mm-ss");
}
