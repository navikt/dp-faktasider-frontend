import fjernOverflodigDokumentData from "./fjernOverflodigDokumentData";
import { SanityBlock } from "../../richTextTypes";
import {
  createSanityBlock,
  createSanityBlockMedDeltTekstVisForAnnotation,
} from "../../../../testUtils/createSanityBlock";

describe("fjernOverflodigDokumentData", () => {
  test("skal fjerne overflødig data i visPaaSider i visForAnnotationDeltTekst og kun ta vare på dokument-id", () => {
    const visForAnnotationDeltTekst = {
      _key: "0a0b6bbf375b",
      _type: "visForAnnotationDeltTekst",
      visPaaSider: [
        {
          _id: "2c5f6768-eee8-4d03-ad48-73632772c996",
          _type: "faktaSide",
          _rev: "a2XPqFEYRKbWkGIIV0WMfa",
          _createdAt: "2020-10-19T12:09:07Z",
          _updatedAt: "2020-11-02T07:38:48Z",
          innhold: [
            {
              _key: "f6408243e760",
              _type: "deltTekstReference",
              deltTekst: { _ref: "b19a0613-f52a-490f-89f6-d1184a57a53f", _type: "reference" },
            },
          ],
          slug: { _type: "slug", current: "test" },
          title: "Test",
          visSprakversjon: { _type: "visSprakversjon", no: true },
          id: "-1c2d5228-80c3-5aef-b28e-b60a281a5051",
          parent: null,
          children: [],
          internal: {
            type: "SanityFaktaSide",
            contentDigest: "4303e084deff04d8a66768cb6f61c387",
            counter: 35,
            owner: "gatsby-source-sanity",
          },
        },
      ],
    };

    const unparsed = {
      _key: "f9fa4a93b43f",
      _type: "unparsed",
      children: [
        {
          _key: "f9fa4a93b43f1",
          _type: "span",
          marks: ["0a0b6bbf375b"],
          text: "Vis på testside",
        },
      ],
      markDefs: [visForAnnotationDeltTekst],
      style: "normal",
    };

    const expected = {
      ...unparsed,
      markDefs: [
        {
          ...visForAnnotationDeltTekst,
          visPaaSider: [
            {
              id: visForAnnotationDeltTekst.visPaaSider[0].id,
            },
          ],
        },
      ],
    };

    const parsed = fjernOverflodigDokumentData(unparsed);

    expect(parsed.markDefs[0].visPaaSider[0]).toHaveProperty("id");
    expect(unparsed.markDefs[0].visPaaSider[0]).toHaveProperty("innhold");
    expect(parsed.markDefs[0].visPaaSider[0]).not.toHaveProperty("innhold");

    expect(JSON.stringify(parsed)).toEqual(JSON.stringify(expected));
    expect(JSON.stringify(parsed).length).toBeLessThan(JSON.stringify(unparsed).length);
  });

  test("gjør ingenting med dokumenter som ikke inneholder overflødig data", () => {
    const blocks: SanityBlock[] = [
      createSanityBlock("Dette er en overskrift", "h2"),
      createSanityBlock("Dette er litt teksts", "normal", ["test"]),
      createSanityBlockMedDeltTekstVisForAnnotation("Dette er en delt tekst", "normal", ["id"], ["student"]),
    ];

    const parsed = fjernOverflodigDokumentData(blocks);

    expect(JSON.stringify(parsed)).toEqual(JSON.stringify(blocks));
  });
});
