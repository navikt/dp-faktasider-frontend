import { FaktasideContext } from "../../hooks/graphQl/fetchFaktaside";
import { MenuItem } from "../../hooks/graphQl/menuDataUtils";

export interface FaktaSideProps extends FaktasideContext {
  path: string;
  menuData: MenuItem[];
}
