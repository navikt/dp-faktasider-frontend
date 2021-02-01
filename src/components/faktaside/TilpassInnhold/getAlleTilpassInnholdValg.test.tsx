import parseRichText from "../../../utils/richTextUtils/parser/parseRichText";
import getAlleTilpassInnholdValg from "./getAlleTilpassInnholdValg";
import { SanityBlock } from "../../../utils/richTextUtils/richTextTypes";
import { createSanityBlock } from "../../../testUtils/createSanityBlock";

const getAlleTilpassInnholdValgTestdata: SanityBlock[] = [
  createSanityBlock("Skal vises for student", "normal", { visFor: ["student"] }),
  createSanityBlock("Skal også vises for student", "normal", { visFor: ["student"] }),
  createSanityBlock("Overskrift", "h2"),
  createSanityBlock("Jeg har en mark som ikke skal regnes med", "normal", { marks: ["randomMark"] }),
  {
    ...createSanityBlock("Jeg har en markDef som ikke skal regnes med", "normal"),
    markDefs: [
      {
        _type: "notRelevant",
        _key: "N/A",
      },
    ],
  },
  createSanityBlock("Skal vises for permittert", "normal", { visFor: ["permittert"] }),
];

test("getAlleFiltreringsValgForInnhold lager en liste over alle tilgjengelige filtrerinsvalg for innhold", () => {
  const parsedText = parseRichText(getAlleTilpassInnholdValgTestdata);
  const filtreringsValg = getAlleTilpassInnholdValg(parsedText);

  expect(filtreringsValg).toHaveLength(2);
  expect(filtreringsValg).toContain("student");
  expect(filtreringsValg).toContain("permittert");
});
