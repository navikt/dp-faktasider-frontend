import getPropertyRecursivlyFromDeepObject from '../../../utils/getPropertyRecursivlyFromDeepObject';
import { Block, MarkDef, VisForConfig } from '../../../utils/richTextUtils/richTextTypes';
import { visForAnnotationTypes } from '../../../utils/richTextUtils/allChildrenMarkedWith';
import { getSituasjonerFromVisForConfig } from '../../../components/BlockContent/VisFor/VisFor';

export type FiltreringsValg = string[];

function getAlleFiltreringsValgForInnhold(innhold: Block[]): FiltreringsValg {
  const alleMarkDefs = getPropertyRecursivlyFromDeepObject<MarkDef>(innhold, 'markDefs');
  const alleVisForMarkDefs = alleMarkDefs.filter((markDef) => visForAnnotationTypes.includes(markDef._type));
  const samletVisForConfig: VisForConfig = alleVisForMarkDefs.reduce(
    (acc: VisForConfig, it) => ({ ...acc, ...it.visFor }),
    {}
  );
  return getSituasjonerFromVisForConfig(samletVisForConfig);
}

export default getAlleFiltreringsValgForInnhold;
