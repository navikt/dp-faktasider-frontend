import { Block } from './richTextTypes';

function allChildrenMarkedWith(block: Block, mark: string): boolean {
  const childrenMedInnhold = block.children?.filter((child) => child.text?.length); // fjerner children med tomme tekster, disse skal ikke regnes med
  return !!childrenMedInnhold?.every((child) => child?.marks?.includes(mark));
}

export default allChildrenMarkedWith;
