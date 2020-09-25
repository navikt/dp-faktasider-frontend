import { DelttekstReference, SanityBlock, Tillegsinformasjon } from '../utils/richTextUtils/richTextTypes';
import { guid } from 'nav-frontend-js-utils';
import { RawFaktasideData } from '../../gatsby-utils/createFaktasider';

/*
 * Funksjoner for å lage sanity-mock-data til bruk i tester
 * */

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

export function createDeltTekstBlock(innhold: SanityBlock[]): DelttekstReference {
  const id = createKey();
  return {
    _type: 'deltTekstReference',
    deltTekst: {
      id: id,
      _type: 'deltTekst',
      _createdAt: '2020-07-03T09:21:09Z',
      _updatedAt: '2020-07-13T09:00:55Z',
      innhold: innhold,
    },
  };
}

export function createSanityBlockMedVisFor(
  text: string,
  style: string,
  visFor?: { [key: string]: boolean },
  omvendtFiltrering_SkjulFor?: boolean
): SanityBlock {
  const block = createSanityBlock(text, style);

  if (!visFor) {
    return block;
  }

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
          skjulFor: omvendtFiltrering_SkjulFor,
          _type: 'visFor',
        },
      },
    ],
  };
}

export function createSanityBlockMedDeltTekstVisForAnnotation(
  text: string,
  style: string,
  visPaaSideIder?: string[],
  visFor?: { [key: string]: boolean }
): SanityBlock {
  const block = createSanityBlockMedVisFor(text, style, visFor || {});

  if (!visPaaSideIder) {
    return block;
  }

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
      ...(block.markDefs || []),
      {
        _key: markKey,
        _type: 'visForAnnotationDeltTekst',
        visPaaSider: visPaaSideIder?.map(
          (id) =>
            ({
              id: id,
            } as RawFaktasideData)
        ),
      },
    ],
  };
}

function createKey() {
  return guid().substr(0, 8);
}

export function createTillegsInformasjon(tittel: string, innhold: SanityBlock[]): Tillegsinformasjon {
  return {
    _type: 'tileggsInformasjon',
    title: tittel,
    innhold: innhold,
  };
}
