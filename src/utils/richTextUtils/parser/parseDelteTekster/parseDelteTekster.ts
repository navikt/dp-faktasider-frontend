import { Block, isRawDeltTekst } from '../../richTextTypes';
import { RichTextParser } from '../parseRichText';

/**
 * leter etter blokker med _type="deltTekst". Delte tekster er tekster som kan trekkes inn i flere faktasider i sanity.
 * Strukturen på innholdet i en deltTekst er lik som i "vanlig innhold" på faktasider,
 * så vi tar innholdet fra deltTekst og flater det ut og inn i det resterende innholdet på faktasiden slik at det parses sammen med resten av innholdet i påfølgende parsere.
 * @param blocks
 */

export const parseDelteTekster: RichTextParser = (blocks: Block[]) => {
  return blocks.flatMap((block) => {
    if (isRawDeltTekst(block)) {
      return block?.innhold || [];
    }
    return block;
  });
};
