import { createSanityBlock } from '../../../../testUtils/createSanityBlock';

const duplikatOverskrift = 'Duplikat overskrift';

const blocks = [
  createSanityBlock('Unik overskrift', 'h2'),
  createSanityBlock(duplikatOverskrift, 'h3'),
  createSanityBlock('Innhold 1', 'normal'),
  createSanityBlock(duplikatOverskrift, 'h2'),
  createSanityBlock('Innhold 2', 'normal'),
];

export const makeUniqueIdTestData = {
  innhold: blocks,
  duplikatOverskrift,
};
