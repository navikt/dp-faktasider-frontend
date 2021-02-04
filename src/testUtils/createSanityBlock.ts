import {
  DelttekstReference,
  MarkDef,
  SanityBlock,
  TidslinjeI,
  Tillegsinformasjon,
} from "../utils/richTextUtils/richTextTypes";
import { guid } from "nav-frontend-js-utils";
import { Translations } from "../types/translations";

/*
 * Funksjoner for å lage sanity-mock-data til bruk i tester
 * */

export const translated = <T>(item: T): Translations<T> => ({ _type: "localeItem", no: item });

export function createSanityBlock(
  text: string,
  style: string,
  config?: { listItem?: "bullet"; marks?: string[]; visFor?: string[]; visPaa?: string[]; omvendtFiltrering?: boolean }
): SanityBlock {
  const visForMark = createVisForMark({
    visFor: config?.visFor,
    visPaaSideIder: config?.visPaa,
    omvendtFiltrering: config?.omvendtFiltrering,
  });

  const markDefs = [visForMark?.markDef].filter((it) => !!it) as MarkDef[];
  const marks = [...(config?.marks || []), visForMark?.markKey].filter((it) => !!it) as string[];

  const listProps = config?.listItem ? { level: 1, listItem: config.listItem } : {};

  const key = createKey();

  return {
    _type: "block",
    _key: key,
    style: style,
    markDefs: markDefs,
    ...listProps,
    children: [
      {
        _type: "span",
        _key: key + "0",
        text: text,
        marks: marks,
      },
    ],
  };
}

export function createDeltTekstBlock(innhold: SanityBlock[]): DelttekstReference {
  return {
    _type: "deltTekstReference",
    deltTekst: {
      _type: "deltTekst",
      _updatedAt: "2020-07-13T09:00:55Z",
      innhold: innhold,
    },
  };
}

function createVisForMark(config: { visPaaSideIder?: string[]; visFor?: string[]; omvendtFiltrering?: boolean }) {
  if (!config.visPaaSideIder && !config.visFor) {
    return undefined;
  }

  const markKey = createKey();

  return {
    markKey: markKey,
    markDef: {
      _key: markKey,
      _type: config.visPaaSideIder ? "visForAnnotationDeltTekst" : "visForAnnotation",
      visFor: {
        situasjoner: config.visFor,
        skjulFor: config.omvendtFiltrering,
        _type: "visFor",
      },
      visPaaSider: config.visPaaSideIder?.map((id) => ({
        _ref: id,
      })),
    } as MarkDef,
  };
}

function createKey() {
  return guid().substr(0, 8);
}

export function createTillegsInformasjon(tittel: string, innhold: SanityBlock[]): Tillegsinformasjon {
  return {
    _type: "tileggsInformasjon",
    title: tittel,
    innhold: innhold,
  };
}

export function createTidslinje(innhold: SanityBlock[]): TidslinjeI {
  return {
    _type: "tidslinje",
    innhold: innhold,
  };
}
