import parseRichText from "../../../utils/richTextUtils/parser/parseRichText";
import getAlleTilpassInnholdValg from "./getAlleTilpassInnholdValg";
import { Block, SanityBlock } from "../../../utils/richTextUtils/richTextTypes";
import { createSanityBlock } from "../../../testUtils/createSanityBlock";
import { mockVisForKonverteringstabell } from "../../BlockContent/VisFor/visFor.testdata";

describe("getAlleFiltreringsValgForInnhold", () => {
  test("lager en liste over alle tilgjengelige filtrerinsvalg for innhold", () => {
    const getAlleTilpassInnholdValgTestdata: SanityBlock[] = [
      createSanityBlock("Skal vises for student", { visFor: ["stud-id"] }),
      createSanityBlock("Skal også vises for student", { visFor: ["stud-id"] }),
      createSanityBlock("Overskrift", { style: "h2" }),
      createSanityBlock("Jeg har en mark som ikke skal regnes med", { marks: ["randomMark"] }),
      createSanityBlock("Skal vises for permittert", { visFor: ["perm-id"] }),
    ];

    const parsedText = parseRichText(getAlleTilpassInnholdValgTestdata);
    const filtreringsValg = getAlleTilpassInnholdValg(mockVisForKonverteringstabell, undefined, parsedText);

    expect(filtreringsValg).toHaveLength(2);
    expect(filtreringsValg).toContain("Student");
    expect(filtreringsValg).toContain("Permittert");
  });

  test("tar med visFor-info på gruppe-config", () => {
    const getAlleTilpassInnholdValgTestdata: SanityBlock[] = [
      createSanityBlock("Overskrift", { style: "h2", visFor: ["stud-id"] }),
      createSanityBlock("Skal vises for permittert"),
    ];

    const parsedText = parseRichText(getAlleTilpassInnholdValgTestdata);
    const filtreringsValg = getAlleTilpassInnholdValg(mockVisForKonverteringstabell, undefined, parsedText);

    expect(filtreringsValg).toHaveLength(1);
    expect(filtreringsValg).toContain("Student");
  });

  test("tar ikke med markDefs som ikke er i bruk", () => {
    const blockMedUbrukMarkDef: Block = {
      _key: "04180ae4e0fc",
      _type: "block",
      children: [
        {
          _key: "6744644ccab5",
          _type: "span",
          marks: [], // _key-verdien fra markdef må ligge her for at den skal bli brukt, det har hendt at det dukker opp ubrukte markDefs i sanity.
          text: "Har du rett til dagpenger når du mottar annen økonomisk støtte fra NAV?",
        },
      ],
      markDefs: [
        {
          _key: "487ac3d50a15",
          _type: "visForAnnotation",
          visFor: {
            _type: "visFor",
            visForSituasjoner: [{ _ref: "stud-id" }],
          },
        },
      ],
      style: "h2",
    };

    const parsedText = parseRichText([blockMedUbrukMarkDef]);
    const filtreringsValg = getAlleTilpassInnholdValg(mockVisForKonverteringstabell, undefined, parsedText);

    expect(filtreringsValg).toHaveLength(0);
  });
});
