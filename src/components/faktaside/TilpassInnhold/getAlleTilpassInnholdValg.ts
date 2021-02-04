import getPropertyRecursivlyFromDeepObject from "../../../utils/getPropertyRecursivlyFromDeepObject";
import { Block, MarkDef, SanityBlock } from "../../../utils/richTextUtils/richTextTypes";
import { visForAnnotationTypes } from "../../../utils/richTextUtils/allChildrenMarkedWith";
import { getUniqueStrings } from "../../BlockContent/VisFor/VisFor";

export type TilpassInnholdValg = string[];

function getAlleTilpassInnholdValg(innhold?: Block[], kortFortalt?: SanityBlock[]): TilpassInnholdValg {
  if (!innhold) return [];
  const altInnhold = [...innhold, ...(kortFortalt || [])];
  const alleMarkDefs = getPropertyRecursivlyFromDeepObject<MarkDef>(altInnhold, "markDefs");
  const alleVisForMarkDefs = alleMarkDefs.filter((markDef) => visForAnnotationTypes.includes(markDef._type));
  const samletVisForConfig = alleVisForMarkDefs.flatMap((it) => it.visFor?.situasjoner || []);

  return getUniqueStrings(samletVisForConfig);
}

export default getAlleTilpassInnholdValg;
