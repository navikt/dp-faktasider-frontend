import { createSanityBlock } from '../../../../testUtils/createSanityBlock';

export const flattenH2TestData = [
  createSanityBlock('Vanlig overskrift', 'h2'),
  createSanityBlock('Overskrift uten bakgrunn', 'h2-no-background'),
  createSanityBlock('Overskrift med meny', 'h2-m-meny'),
  createSanityBlock('Menypunkt', 'h3'),
];
