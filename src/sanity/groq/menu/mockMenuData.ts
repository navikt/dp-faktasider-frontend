import { translated } from "../../../testUtils/createSanityBlock";

export const mockMenuData = {
  lenker: [
    {
      _type: "menylenkeEkstern",
      url: "https://www.nav.no/ekstern/side",
      tittel: "Ekstern lenke",
      beskrivelse: "Lenke til en ekstern side",
    },
    { _type: "reference", referenceType: "faktaSide", pageId: "random-id-permittert" },
    { _type: "reference", referenceType: "faktaSide", pageId: "-89eddf21-6b78-5f89-8d1f-7f5f8ebfe735" },
  ],
  sider: [
    {
      slug: "permittert",
      title: translated("Permittert"),
      visSprakversjon: {
        no: true,
      },
      beskrivelse: translated("Har du blitt permittert?"),
      id: "-89eddf21-6b78-5f89-8d1f-7f5f8ebfe735",
    },
    {
      slug: "arbeidsledig",
      title: translated("Arbeidsledig"),
      visSprakversjon: {
        no: true,
      },
      beskrivelse: translated(
        "Har du blitt arbeidsledig, kan du ha rett til økonomisk støtte og hjelp til å komme i arbeid."
      ),
      id: "-89eddf21-6b78-5f89-8d1f-7f5f8ebfe735",
    },
  ],
};
