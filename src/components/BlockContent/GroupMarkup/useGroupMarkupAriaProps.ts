import { Group } from '../../../utils/richTextUtils/richTextTypes';

export function useGroupMarkupAriaProps(group: Group) {
  const id = group.blockConfig?.id;
  const headerId = id + '-header';

  return {
    regionProps: {
      id: id,
      tabIndex: -1,
      'aria-labelledby': headerId,
    },
    headerProps: {
      id: headerId,
    },
  };
}
