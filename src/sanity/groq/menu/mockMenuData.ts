import { MenuQueryData } from "./menuQuery";
import { translated } from "../../../testUtils/createSanityBlock";

export const mockMenuData: MenuQueryData = {
  lenker: [
    {
      _type: "eksternLenke",
      url: "https://www.nav.no/ekstern/side",
      tittel: "Ekstern lenke",
      beskrivelse: "Hit kan du gå for å lese om spennende eksterne ting",
    },
  ],
  sider: [
    {
      slug: "permittert",
      title: translated("Permittert"),
      visSprakversjon: {
        no: true,
      },
      beskrivelse: translated("Har du blitt permittert?"),
      id: "random-id-permittert",
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
