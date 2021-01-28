import { createSanityBlock, translated } from "./createSanityBlock";
import { FaktasideQueryData } from "../sanity/groq/faktaside/faktasideQuery";

export const faktaSideMockContext: FaktasideQueryData = {
  faktaside: {
    _updatedAt: new Date().toISOString(),
    innhold: translated([
      createSanityBlock("Dette er en overskrift", "h2"),
      createSanityBlock("Dette er litt innhold", "normal"),
    ]),
    title: translated("Faktasidemock"),
    id: "id",
    slug: "test",
    relatertInformasjon: translated([createSanityBlock("Relatert info", "normal")]),
    beskrivelse: translated("Dette er testdata"),
    visSprakversjon: {
      no: true,
      en: false,
    },
    kortFortalt: translated([]),
    visIngenValgPasser: true,
  },
  oppsett: {
    folketrygdensGrunnbellop: 1000,
    notifikasjoner: [],
    title: translated("Domenetittel"),
  },
};
