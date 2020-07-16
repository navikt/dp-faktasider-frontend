import { createFaktasideSummary, FaktasideSummary, RawFaktasideSummary } from './createFaktasideSummaries';
import { faktaSideMockContext } from '../../testUtils/faktaSideMockContext';

export const rawFaktasideSummary: RawFaktasideSummary = {
  id: faktaSideMockContext.id,
  title: {
    _type: 'localeString',
    no: faktaSideMockContext.title,
  },
  ingress: {
    _type: 'localeText',
    no: faktaSideMockContext.ingress,
  },
  slug: {
    current: faktaSideMockContext.slug,
  },
  visSprakversjon: faktaSideMockContext.visSprakversjon,
};

export const faktasiderSummaryMockData: FaktasideSummary[] = [
  {
    path: '/no/arbeidsledig/',
    tittel: 'Arbeidsledig',
    språk: 'no',
    tilgjengeligPåValgtSpråk: true,
    ingress: 'Har du blitt arbeidsledig, kan du ha rett til økonomisk støtte og hjelp til å komme i arbeid.',
    id: '-89eddf21-6b78-5f89-8d1f-7f5f8ebfe735',
  },
  {
    path: '/no/permittert/',
    tittel: 'Permittert',
    språk: 'no',
    tilgjengeligPåValgtSpråk: false,
    ingress: 'Er du permittert, kan du ha rett til økomisk støtte og hjelp til å komme i arbeid.',
    id: '-21aed679-d1fa-5238-ac15-c39b39ce3011',
  },
  createFaktasideSummary(rawFaktasideSummary, 'no'),
];
