import { RawDeltTekst, SanityBlock } from '../utils/richTextUtils/richTextTypes';
import { guid } from 'nav-frontend-js-utils';

export function createSanityBlock(text: string, style: string, marks?: string[]): SanityBlock {
  const key = createKey();

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
        marks: marks || [],
      },
    ],
  };
}

export function crateSanityListeElement(tekst: string, marks?: string[]): SanityBlock {
  return {
    ...createSanityBlock(tekst, 'normal', marks),
    level: 1,
    listItem: 'bullet',
  };
}

export function crateSanityListeElementMedVisFor(tekst: string, visFor: { [key: string]: boolean }): SanityBlock {
  return {
    ...createSanityBlockMedVisFor(tekst, 'normal', visFor),
    level: 1,
    listItem: 'bullet',
  };
}

export function createDeltTekstBlock(innhold: SanityBlock[]): RawDeltTekst {
  const id = createKey();
  return {
    id: id,
    _type: 'deltTekst',
    _createdAt: '2020-07-03T09:21:09Z',
    _updatedAt: '2020-07-13T09:00:55Z',
    innhold: innhold,
  };
}

export function createSanityBlockMedVisFor(
  text: string,
  style: string,
  visFor: { [key: string]: boolean }
): SanityBlock {
  const block = createSanityBlock(text, style);
  const markKey = createKey();

  return {
    ...block,
    children: [
      {
        ...block.children![0],
        marks: [markKey],
      },
    ],
    markDefs: [
      {
        _key: markKey,
        _type: 'visForAnnotation',
        visFor: {
          ...visFor,
          _type: 'visFor',
        },
      },
    ],
  };
}

function createKey() {
  return guid().substr(0, 8);
}
