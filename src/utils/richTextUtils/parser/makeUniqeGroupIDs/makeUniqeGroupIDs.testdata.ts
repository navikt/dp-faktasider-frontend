import { createSanityBlock } from '../../../../testUtils/createSanityBlock';

export const makeUniqueIdTestData = [
  createSanityBlock('Unik overskrift', 'h2'),
  createSanityBlock('Duplikat overskrift', 'h3'),
  createSanityBlock('Innhold 1', 'normal'),
  createSanityBlock('Duplikat overskrift', 'h2'),
  createSanityBlock('Innhold 2', 'normal'),
];
