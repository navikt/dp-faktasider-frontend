import { FaktasideContext } from '../../gatsby-utils/createFaktasider';
import { createSanityBlock } from './createSanityBlock';
import parseRichText from '../utils/richTextUtils/parser/parseRichText';

const title = 'Testside';
export const faktasideTestId = 'faktaside-test-id';

export const faktaSideMockContext: FaktasideContext = {
  publiseringsTidspunkt: new Date().toISOString(),
  innhold: parseRichText([
    createSanityBlock('Dette er en overskrift', 'h2'),
    createSanityBlock('Dette er litt innhold', 'normal'),
  ]),
  title: title,
  lang: 'no',
  id: faktasideTestId,
  slug: '/test',
  relatertInformasjon: [createSanityBlock('Relatert info', 'normal')],
  ingress: 'Dette er testdata',
  rawData: {
    title: {
      _type: 'localeString',
      en: title,
      no: title,
    },
  },
  visSprakversjon: {
    no: true,
    en: false,
  },
  project: {
    summaries: [],
    title: 'Test-title',
  },
};
