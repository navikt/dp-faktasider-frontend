import { Group } from '../../../utils/richTextUtils/richTextTypes';

export function useGroupMarkupAriaProps(group: Group) {
  const id = group.blockConfig?.id || 'N/A';
  const headerId = id + '-header';

  return {
    id,
    regionProps: {
      'aria-labelledby': headerId,
    },
    headerProps: {
      id: headerId,
    },
  };
}
