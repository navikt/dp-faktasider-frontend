import { getPubliseringsTidspunkt } from "./getPubliseringstidspunkt";
import { DelttekstReference } from "../utils/richTextUtils/richTextTypes";
import { FaktasideQueryData } from "../sanity/groq/faktaside/faktasideQuery";
import { faktaSideMockQueryData } from "../testUtils/faktaSideMockQueryData";

const updatedAtLatest = "2020-12-12T16:59:00.000Z";
const updatedAtOldest = "2020-01-01T12:00:00.000Z";

const deltTekstReference: DelttekstReference = {
  _type: "deltTekstReference",
  deltTekst: {
    _type: "deltTekst",
    _updatedAt: updatedAtLatest,
  },
};

const testData: FaktasideQueryData = {
  ...faktaSideMockQueryData,
  faktaside: {
    ...faktaSideMockQueryData.faktaside!!,
    id: "-8f5fc5e2-5558-5a02-a3ff-4c0108ea8b8c",
    _updatedAt: updatedAtOldest,
    innhold: {
      _type: "localeRichText",
      no: [deltTekstReference],
    },
  },
};

test("finner nyeste publiseringstidspunkt fra faktaside", () => {
  const tidspunkt = getPubliseringsTidspunkt(testData);
  expect(tidspunkt).toEqual(updatedAtLatest);
});
