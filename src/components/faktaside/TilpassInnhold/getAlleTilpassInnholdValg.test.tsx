import parseRichText from "../../../utils/richTextUtils/parser/parseRichText";
import { Block, SanityBlock } from "../../../utils/richTextUtils/richTextTypes";
import { createSanityBlock } from "../../../testUtils/createSanityBlock";

describe("getAlleFiltreringsValgForInnhold", () => {
  test("lager en liste over alle tilgjengelige filtrerinsvalg for innhold", () => {
    const getAlleTilpassInnholdValgTestdata: SanityBlock[] = [
      createSanityBlock("Skal vises for student", { visFor: ["student"] }),
      createSanityBlock("Skal også vises for student", { visFor: ["student"] }),
      createSanityBlock("Overskrift", { style: "h2" }),
      createSanityBlock("Jeg har en mark som ikke skal regnes med", { marks: ["randomMark"] }),
      createSanityBlock("Skal vises for permittert", { visFor: ["permittert"] }),
    ];

    const parsedText = parseRichText(getAlleTilpassInnholdValgTestdata);
    const filtreringsValg = parsedText.tilpassInnholdValg();

    expect(filtreringsValg).toHaveLength(2);
    expect(filtreringsValg).toContain("student");
    expect(filtreringsValg).toContain("permittert");
  });

  test("tar med visFor-info på gruppe-config", () => {
    const getAlleTilpassInnholdValgTestdata: SanityBlock[] = [
      createSanityBlock("Overskrift", { style: "h2", visFor: ["student"] }),
      createSanityBlock("Skal vises for permittert"),
    ];

    const parsedText = parseRichText(getAlleTilpassInnholdValgTestdata);
    const filtreringsValg = parsedText.tilpassInnholdValg();

    expect(filtreringsValg).toHaveLength(1);
    expect(filtreringsValg).toContain("student");
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
            situasjoner: ["Mottar annen støtte fra NAV"],
          },
        },
      ],
      style: "h2",
    };

    const parsedText = parseRichText([blockMedUbrukMarkDef]);
    const filtreringsValg = parsedText.tilpassInnholdValg();

    expect(filtreringsValg).toHaveLength(0);
  });
});
