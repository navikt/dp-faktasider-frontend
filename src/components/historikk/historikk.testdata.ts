import { Revision } from "./api/revisionsFetcher";
import { HistorikkResponse, HistoriskDokument } from "./api/historikkFetcher";
import { HistorikkHjelpeTekster, HistorikkProps } from "../../pages/historikk/[...slug]";
import { Block, SanityBlock } from "../../utils/richTextUtils/richTextTypes";
import { createSanityBlock } from "../../testUtils/createSanityBlock";

const timestamp = "2020-01-01T12:00:00.000Z";
const docId = "docId";
const revisionId = "revId";

const revision: Revision = {
  id: revisionId,
  timestamp: timestamp,
};

const document = {
  _type: "faktaSide",
  _createdAt: timestamp,
  _id: docId,
  _rev: revisionId,
  _updatedAt: timestamp,
  title: "Testtittel",
  beskrivelse: "testbeskrivelse",
};

const testHjelpetekster: HistorikkHjelpeTekster = {
  deltTekstForklaring: [createSanityBlock("Dette er en delt tekst")],
  kortInfo: "dette er kort info",
  langInfo: [createSanityBlock("Dette er lang info")],
  title: "Dette er en test for historiske versjoner",
};

const testProps: HistorikkProps = {
  revisions: [revision],
  response: {
    documents: [document as HistoriskDokument],
  },
  request: {
    id: docId,
    time: timestamp,
  },
  hjelpeTekster: testHjelpetekster,
  domeneTittel: "Testy test",
  nåværendeSidetittel: "Testside",
};

function getHistorikkTestDataMedInnhold(innhold: Block[], type?: "faktaSide" | "deltTekst"): HistorikkProps {
  return {
    ...testProps,
    response: {
      documents: [
        {
          ...document,
          nokkelordBeskrivelse: "testnokkelordbeskrivelse",
          visIngenValgPasser: false,
          _type: type || "faktaSide",
          innhold: innhold,
        },
      ],
    },
  };
}

export const historikkDeltTekstTestdata = getHistorikkTestDataMedInnhold([
  createSanityBlock("Dette er en bolk", { style: "h2" }),
  {
    _type: "deltTekstReference",
    // @ts-ignore
    deltTekst: {
      _ref: "testyTest",
    },
  },
]);

export const historikkGBelløpTestdata = getHistorikkTestDataMedInnhold([
  createSanityBlock("Dette er en bolk", { style: "h2" }),
  createSanityBlock("2", { marks: ["GtilNOK"] }),
]);

export const historikkCustomComponentTestdata = getHistorikkTestDataMedInnhold([
  createSanityBlock("Dette er en bolk", { style: "h2" }),
  {
    _type: "customComponent",
    // @ts-ignore
    komponent: "DagpengeKalkulator - Normal",
  },
]);

export const historikkVisPaaTestdata = getHistorikkTestDataMedInnhold(
  [
    createSanityBlock("Dette er en bolk", { style: "h2" }),
    createSanityBlock("Dette skal kun vises på en bestemt side", { visPaa: ["minFaktasideId"] }),
  ],
  "deltTekst"
);
