import getPropertyRecursivlyFromDeepObject from "../../../utils/getPropertyRecursivlyFromDeepObject";
import { Block, BlockConfigFromParser, MarkDef, SanityBlock } from "../../../utils/richTextUtils/richTextTypes";
import { visForAnnotationTypes } from "../../../utils/richTextUtils/allChildrenMarkedWith";
import { getUniqueStrings } from "../../BlockContent/VisFor/VisFor";

export type TilpassInnholdValg = string[];

function fjernMarkDefsSomIkkeErIBruk(markDefs: MarkDef[], altInnhold: Block[]) {
  const alleMarks = getPropertyRecursivlyFromDeepObject<string>(altInnhold, "marks");
  return markDefs.filter((markDef) => alleMarks.includes(markDef._key));
}

function getAlleTilpassInnholdValg(innhold?: Block[], kortFortalt?: SanityBlock[]): TilpassInnholdValg {
  if (!innhold) return [];
  const altInnhold = [...innhold, ...(kortFortalt || [])];

  const alleMarkDefs = getPropertyRecursivlyFromDeepObject<MarkDef>(altInnhold, "markDefs");
  const alleVisForMarkDefs = alleMarkDefs.filter((markDef) => visForAnnotationTypes.includes(markDef._type));
  const visForMarkDefsSomErIBruk = fjernMarkDefsSomIkkeErIBruk(alleVisForMarkDefs, altInnhold);
  const situasjonerFraMarkDefs = visForMarkDefsSomErIBruk.flatMap((it) => it.visFor?.situasjoner || []);

  const alleBlockConfigs = getPropertyRecursivlyFromDeepObject<BlockConfigFromParser>(altInnhold, "blockConfig");
  const situasjonerFraBlockConfig = alleBlockConfigs.flatMap((it) => it.visFor?.situasjoner || []);

  return getUniqueStrings([...situasjonerFraMarkDefs, ...situasjonerFraBlockConfig]).sort();
}

export default getAlleTilpassInnholdValg;
