import { createSanityBlock } from "./createSanityBlock";
import parseRichText from "../utils/richTextUtils/parser/parseRichText";
import { FaktaSideProps } from "../components/faktaside/types";

const title = "Testside";

export const faktaSideMockContext: FaktaSideProps = {
  publiseringsTidspunkt: new Date().toISOString(),
  innhold: parseRichText([
    createSanityBlock("Dette er en overskrift", "h2"),
    createSanityBlock("Dette er litt innhold", "normal"),
  ]),
  title: title,
  lang: "no",
  id: "id",
  slug: "/test",
  relatertInformasjon: [createSanityBlock("Relatert info", "normal")],
  beskrivelse: "Dette er testdata",
  rawData: {
    title: {
      _type: "localeString",
      en: title,
      no: title,
    },
  },
  visSprakversjon: {
    no: true,
    en: false,
  },
  notifikasjoner: [],
  folketrygdensGrunnbellop: 1000,
  sideTittel: "Testside",
  kortFortalt: [],
  menuData: [],
  path: "",
  visIngenValgPasser: true,
};
