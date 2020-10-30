import { Block, TidslinjeI } from '../../../utils/richTextUtils/richTextTypes';

export interface TidslinjePunkt {
  tittel?: Block;
  innhold: Block[];
  id: string;
}

export function parseTidslinjedata(tidslinjeData: TidslinjeI): TidslinjePunkt[] {
  let punkter: TidslinjePunkt[] = [];
  let currentPunkt: TidslinjePunkt | undefined = undefined;

  tidslinjeData.innhold.forEach((block) => {
    if (block.style === 'tidslinjepunkt') {
      currentPunkt = {
        tittel: block,
        innhold: [],
        id: block._key || 'N/A',
      };
      punkter.push(currentPunkt);
    } else {
      if (!currentPunkt) {
        currentPunkt = {
          tittel: undefined,
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
