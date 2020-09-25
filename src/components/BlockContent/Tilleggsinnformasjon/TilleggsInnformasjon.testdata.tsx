import { createSanityBlock, createTillegsInformasjon } from '../../../testUtils/createSanityBlock';
import { SanityBlock } from '../../../utils/richTextUtils/richTextTypes';
import parseRichText from '../../../utils/richTextUtils/parser/parseRichText';

export const tillegsinformasjonTestData: SanityBlock[] = parseRichText([
  createSanityBlock('Overskrift', 'h2'),
  createSanityBlock('Litt informasjon', 'normal'),
  createTillegsInformasjon('Ekstra info', [createSanityBlock('Dette er tillegsinformasjon å vite', 'normal')]),
]);
