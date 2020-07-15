import { FaktasideContext } from '../../gatsby-utils/createFaktasider';
import { createSanityBlock } from './createSanityBlock';

const title = 'Testside';

export const faktaSideMockContext: FaktasideContext = {
  publiseringsTidspunkt: new Date().toISOString(),
  innhold: [createSanityBlock('Dette er litt innhold', 'h2')],
  title: title,
  lang: 'no',
  id: 'id',
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
};
