import { FaktasideContext } from "../../hooks/graphQl/fetchFaktaside";
import { MenuItem } from "../../hooks/graphQl/menuDataUtils";
import { Notifikasjon } from "./Notifikasjoner";

export interface FaktaSideProps extends FaktasideContext {
  path: string;
  notifikasjoner: Notifikasjon[];
  menuData: MenuItem[];
}