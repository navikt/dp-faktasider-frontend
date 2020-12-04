import getPropertyRecursivlyFromDeepObject from "../../../utils/getPropertyRecursivlyFromDeepObject";
import { Block, MarkDef, SanityBlock, VisForConfig } from "../../../utils/richTextUtils/richTextTypes";
import { visForAnnotationTypes } from "../../../utils/richTextUtils/allChildrenMarkedWith";
import { getSituasjonerFromVisForConfig } from "../../../components/BlockContent/VisFor/VisFor";

export type TilpassInnholdValg = string[];

function getAlleTilpassInnholdValg(innhold: Block[], kortFortalt?: SanityBlock[]): TilpassInnholdValg {
  const altInnhold = [...innhold, ...(kortFortalt || [])];
  const alleMarkDefs = getPropertyRecursivlyFromDeepObject<MarkDef>(altInnhold, "markDefs");
  const alleVisForMarkDefs = alleMarkDefs.filter((markDef) => visForAnnotationTypes.includes(markDef._type));
  const samletVisForConfig: VisForConfig = alleVisForMarkDefs.reduce(
    (acc: VisForConfig, it) => ({ ...acc, ...it.visFor }),
    {}
  );
  return getSituasjonerFromVisForConfig(samletVisForConfig);
}

export default getAlleTilpassInnholdValg;
