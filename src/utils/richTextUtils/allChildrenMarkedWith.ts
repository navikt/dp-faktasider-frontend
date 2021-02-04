import { Block, VisForConfig, VisPaaConfig } from "./richTextTypes";

function allChildrenMarkedWith(block: Block, mark: string): boolean {
  const childrenMedInnhold = block.children?.filter((child) => child.text?.length); // fjerner children med tomme tekster, disse skal ikke regnes med
  return !!childrenMedInnhold?.every((child) => child?.marks?.includes(mark));
}

interface CommonVisConfig {
  visFor?: VisForConfig;
  visPaa?: VisPaaConfig;
}

export const visForAnnotationTypes = ["visForAnnotationDeltTekst", "visForAnnotation"];

export function getCommonVisForConfig(block: Block): CommonVisConfig | undefined {
  const visForAnnotation = block.markDefs?.find((markDef) => visForAnnotationTypes.includes(markDef._type));
  const alleMerketMedVisFor = visForAnnotation && allChildrenMarkedWith(block, visForAnnotation._key);

  if (alleMerketMedVisFor) {
    return {
      visFor: visForAnnotation?.visFor,
      visPaa: visForAnnotation?.visPaaSider?.map((side) => side._ref),
    };
  }

  return undefined;
}

export default allChildrenMarkedWith;
