import parseRichText from "../../../utils/richTextUtils/parser/parseRichText";
import getAlleTilpassInnholdValg from "./getAlleTilpassInnholdValg";
import { SanityBlock } from "../../../utils/richTextUtils/richTextTypes";
import { createSanityBlock, createSanityBlockMedVisFor } from "../../../testUtils/createSanityBlock";

const getAlleFiltreringsValgForInnholdTestData: SanityBlock[] = [
  createSanityBlockMedVisFor("Skal vises for student", "normal", ["student"]),
  createSanityBlockMedVisFor("Skal også vises for student", "normal", ["student"]),
  createSanityBlock("Overskrift", "h2"),
  createSanityBlock("Jeg har en mark som ikke skal regnes med", "normal", ["randomMark"]),
  {
    ...createSanityBlock("Jeg har en markDef som ikke skal regnes med", "normal"),
    markDefs: [
      {
        _type: "notRelevant",
        _key: "N/A",
      },
    ],
  },
  createSanityBlockMedVisFor("Skal vises for permittert", "normal", ["permittert"]),
];

test("getAlleFiltreringsValgForInnhold lager en liste over alle tilgjengelige filtrerinsvalg for innhold", () => {
  const parsedText = parseRichText(getAlleFiltreringsValgForInnholdTestData);
  const filtreringsValg = getAlleTilpassInnholdValg(parsedText);

  expect(filtreringsValg).toHaveLength(2);
  expect(filtreringsValg).toContain("student");
  expect(filtreringsValg).toContain("permittert");
});
