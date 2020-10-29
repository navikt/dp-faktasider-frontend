import { Block, TidslinjeI } from '../../../utils/richTextUtils/richTextTypes';
import { getTextFromChildren } from '../../../utils/richTextUtils/parser/groupParser/groupParser';

export interface TidslinjePunkt {
  tittel: string;
  innhold: Block[];
  id: string;
}

export function parseTidslinjedata(tidslinjeData: TidslinjeI): TidslinjePunkt[] {
  let punkter: TidslinjePunkt[] = [];
  let currentPunkt: TidslinjePunkt | undefined = undefined;

  tidslinjeData.innhold.forEach((block) => {
    if (block.style === 'tidslinjepunkt') {
      currentPunkt = {
        tittel: getTextFromChildren(block),
        innhold: [],
        id: block._key || 'N/A',
      };
      punkter.push(currentPunkt);
    } else {
      if (!currentPunkt) {
        currentPunkt = {
          tittel: '',
          innhold: [],
          id: 'førstePunkt',
        };
        punkter.push(currentPunkt);
      }
      currentPunkt.innhold.push(block);
    }
  });

  return punkter;
}
