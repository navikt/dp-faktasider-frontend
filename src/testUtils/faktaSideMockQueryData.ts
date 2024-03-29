import { translated } from "./createSanityBlock";
import { mockVisForKonverteringstabell } from "../components/BlockContent/VisFor/visFor.testdata";

export const faktaSideMockQueryData = {
  faktaside: {
    id: "testId",
    _updatedAt: new Date().toISOString(),
    innhold: translated([]),
    title: translated("Test-faktaside"),
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
  situasjonsvalg: mockVisForKonverteringstabell.map((it) => ({ _id: it._id, name: translated(it.name) })),
  notifikasjoner: [],
};
