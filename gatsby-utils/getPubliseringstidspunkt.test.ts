import { RawFaktasideData } from './createFaktasider';
import { getPubliseringsTidspunkt } from './getPubliseringstidspunkt';
import { DelttekstReference } from '../src/utils/richTextUtils/richTextTypes';

const updatedAtLatest = '2020-12-12T16:59:00.000Z';
const updatedAtOldest = '2020-01-01T12:00:00.000Z';

const deltTekstReference: DelttekstReference = {
  _type: 'deltTekstReference',
  deltTekst: {
    id: '',
    _type: 'deltTekst',
    _createdAt: '2020-07-07T12:19:13Z',
    _updatedAt: updatedAtLatest,
  },
};

const testData: RawFaktasideData = ({
  id: '-8f5fc5e2-5558-5a02-a3ff-4c0108ea8b8c',
  _updatedAt: updatedAtOldest,
  innhold: {
    _type: 'localeRichText',
    no: [deltTekstReference],
  },
} as unknown) as RawFaktasideData;

test('finner nyeste publiseringstidspunkt fra faktaside', () => {
  const tidspunkt = getPubliseringsTidspunkt(testData);
  expect(tidspunkt).toEqual(updatedAtLatest);
});
