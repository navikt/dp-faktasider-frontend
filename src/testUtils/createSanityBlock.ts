import {
  DelttekstReference,
  MarkDef,
  SanityBlock,
  TidslinjeI,
  Tillegsinformasjon,
} from "../utils/richTextUtils/richTextTypes";
import { v4 as uuidv4 } from "uuid";
import { Translations } from "../types/translations";

/*
 * Funksjoner for å lage sanity-mock-data til bruk i tester
 * */

export const translated = <T>(item: T): Translations<T> => ({ _type: "localeItem", no: item });

type Style = "normal" | "h2" | "h3" | "h4" | "tidslinjepunkt" | "h2-no-background" | "h2-m-meny";

export function createSanityBlock(
  text: string,
  config?: {
    style?: Style;
    listItem?: "bullet";
    marks?: string[];
    visFor?: string[];
    visPaa?: string[];
    omvendtFiltrering?: boolean;
    linkTo?: string;
  }
): SanityBlock {
  const visForMark = createVisForMark({
    visFor: config?.visFor,
    visPaaSideIder: config?.visPaa,
    omvendtFiltrering: config?.omvendtFiltrering,
  });

  const linkMark = createLinkMark(config?.linkTo);

  const markDefs = [visForMark?.markDef, linkMark?.markDef].filter((it) => !!it) as MarkDef[];
  const marks = [...(config?.marks || []), visForMark?.markKey, linkMark?.markKey].filter((it) => !!it) as string[];

  const listProps = config?.listItem ? { level: 1, listItem: config.listItem } : {};

  const key = createKey();

  return {
    _type: "block",
    _key: key,
    style: config?.style || "normal",
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
      _type: "visForAnnotation",
      visFor: {
        visForSituasjoner: config.visFor?.map((id) => ({ _ref: id })),
        skjulFor: config.omvendtFiltrering,
        _type: "visFor",
      },
      visPaaSider: config.visPaaSideIder?.map((id) => ({
        _ref: id,
      })),
    } as MarkDef,
  };
}

function createLinkMark(linkTo?: string) {
  if (!linkTo) {
    return undefined;
  }

  const markKey = createKey();

  return {
    markKey: markKey,
    markDef: {
      _key: markKey,
      _type: "link",
      href: linkTo,
    } as MarkDef,
  };
}

function createKey() {
  return uuidv4().substr(0, 8);
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
