import { RawFaktasideData } from './createFaktasider';
import { getPubliseringsTidspunkt } from './getPubliseringstidspunkt';

const updatedAtLatest = '2020-12-12T16:59:00.000Z';
const updatedAtOldest = '2020-01-01T12:00:00.000Z';
const testData: RawFaktasideData = ({
  id: '-8f5fc5e2-5558-5a02-a3ff-4c0108ea8b8c',
  _updatedAt: updatedAtOldest,
  innhold: {
    _type: 'localeRichText',
    no: [
      {
        _id: '2dd989da-015a-4b34-a17f-0db16e262cba',
        _type: 'deltTekst',
        _rev: 'vjB4IBgC6oD958oKAx8LWN',
        _createdAt: '2020-07-07T12:19:13Z',
        _updatedAt: updatedAtLatest,
      },
    ],
  },
} as unknown) as RawFaktasideData;

test('finner nyeste publiseringstidspunkt fra faktaside', () => {
  const tidspunkt = getPubliseringsTidspunkt(testData, 'no');
  expect(tidspunkt).toEqual(updatedAtLatest);
});
