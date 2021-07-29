import { translated } from "./createSanityBlock";
import { FaktasideQueryData } from "../sanity/groq/faktaside/faktasideQuery";

export const faktaSideMockQueryData: FaktasideQueryData = {
  faktaside: {
    _updatedAt: new Date().toISOString(),
    innhold: translated([]),
    title: translated("Test-faktaside"),
    id: "testId",
    slug: "test",
    beskrivelse: translated("Testbeskrivelse for søkemotor"),
    visSprakversjon: {
      no: true,
      en: false,
    },
    kortFortalt: translated([]),
  },
  oppsett: {
    folketrygdensGrunnbellop: 1000,
    title: translated("Domenetittel"),
  },
  notifikasjoner: [],
};
