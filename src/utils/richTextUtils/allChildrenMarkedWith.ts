import { SanityBlock, VisForConfig, VisPaaConfig } from "./richTextTypes";

function allChildrenMarkedWith(block: SanityBlock, mark: string): boolean {
  const childrenMedInnhold = block.children?.filter((child) => child.text?.length); // fjerner children med tomme tekster, disse skal ikke regnes med
  return !!childrenMedInnhold?.every((child) => child?.marks?.includes(mark));
}

interface CommonVisConfig {
  visFor?: VisForConfig;
  visPaa?: VisPaaConfig;
}

export function getCommonVisForConfig(block: SanityBlock): CommonVisConfig | undefined {
  const visForAnnotation = block.markDefs?.find((markDef) => markDef._type === "visForAnnotation");
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
