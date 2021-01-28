import { faktaSideMockContext } from "../../../testUtils/faktaSideMockContext";
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
      slug: faktaSideMockContext.faktaside.slug,
      title: faktaSideMockContext.faktaside.title,
      visSprakversjon: {
        no: true,
      },
      beskrivelse: faktaSideMockContext.faktaside.beskrivelse,
      nokkelordBeskrivelse: faktaSideMockContext.faktaside.beskrivelse,
      id: faktaSideMockContext.faktaside.id,
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
      nokkelordBeskrivelse: translated("Arbeidsleidg, støtte, velferd"),
      id: "-89eddf21-6b78-5f89-8d1f-7f5f8ebfe735",
    },
  ],
};
