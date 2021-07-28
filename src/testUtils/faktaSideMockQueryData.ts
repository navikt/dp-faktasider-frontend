import { createSanityBlock, translated } from "./createSanityBlock";
import { FaktasideQueryData } from "../sanity/groq/faktaside/faktasideQuery";

export const faktaSideMockQueryData: FaktasideQueryData = {
  faktaside: {
    _updatedAt: new Date().toISOString(),
    innhold: translated([
      createSanityBlock("Dette er en overskrift", { style: "h2" }),
      createSanityBlock("Dette er litt innhold"),
    ]),
    title: translated("Faktasidemock"),
    id: "id",
    slug: "test",
    beskrivelse: translated("Dette er testbeskrivelse for søkemotor"),
    visSprakversjon: {
      no: true,
      en: false,
    },
    kortFortalt: translated([]),
    visIngenValgPasser: true,
  },
  oppsett: {
    folketrygdensGrunnbellop: 1000,
    title: translated("Domenetittel"),
  },
  notifikasjoner: [],
};
