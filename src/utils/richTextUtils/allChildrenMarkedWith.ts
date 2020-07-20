import { Block, VisForConfig } from './richTextTypes';

function allChildrenMarkedWith(block: Block, mark: string): boolean {
  const childrenMedInnhold = block.children?.filter((child) => child.text?.length); // fjerner children med tomme tekster, disse skal ikke regnes med
  return !!childrenMedInnhold?.every((child) => child?.marks?.includes(mark));
}

export function getCommonVisForConfig(block: Block): VisForConfig | undefined {
  const visForAnnotation = block.markDefs?.find((markDef) => markDef._type === 'visForAnnotation');
  const alleMerketMedVisFor = visForAnnotation && allChildrenMarkedWith(block, visForAnnotation._key);

  if (alleMerketMedVisFor) {
    return visForAnnotation?.visFor;
  }

  return undefined;
}

export default allChildrenMarkedWith;
