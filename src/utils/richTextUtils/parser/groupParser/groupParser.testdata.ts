import { createSanityBlock } from '../../../../testUtils/createSanityBlock';

export const groupParserTestData = [
  createSanityBlock('Overskrift 1', 'h2'),
  createSanityBlock('Innhold 1', 'normal'),
  createSanityBlock('Overskrift 2', 'h2'),
  createSanityBlock('Innhold 2', 'normal'),
  createSanityBlock('Overskrift 2.1', 'h3'),
  createSanityBlock('Innhold 2.1', 'normal'),
  createSanityBlock('Overskrift 2.1.1', 'h4'),
  createSanityBlock('Innhold 2.1.1', 'normal'),
  createSanityBlock('Overskrift 2.2', 'h3'),
  createSanityBlock('Innhold 2.2', 'normal'),
];
