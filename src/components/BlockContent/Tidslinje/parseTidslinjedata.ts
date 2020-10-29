import { Block, TidslinjeI } from '../../../utils/richTextUtils/richTextTypes';
import { getTextFromSanityBlock } from '../../../utils/richTextUtils/getTextFromSanityBlock';

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
        tittel: getTextFromSanityBlock(block),
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
