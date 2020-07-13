import { RawDeltTekst, SanityBlock } from '../utils/richTextUtils/richTextTypes';
import { guid } from 'nav-frontend-js-utils';

export function createSanityBlock(text: string, style: string): SanityBlock {
  const key = guid().substr(0, 8);

  return {
    _type: 'block',
    _key: key,
    style: style,
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: key + '0',
        text: text,
        marks: [],
      },
    ],
  };
}

export function createDeltTekstBlock(innhold: SanityBlock[]): RawDeltTekst {
  const id = guid();
  return {
    id: id,
    _type: 'deltTekst',
    _createdAt: '2020-07-03T09:21:09Z',
    _updatedAt: '2020-07-13T09:00:55Z',
    innhold: innhold,
  };
}
