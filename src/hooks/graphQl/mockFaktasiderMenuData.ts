import { faktaSideMockContext } from "../../testUtils/faktaSideMockContext";
import { MenuItem } from "./menuDataUtils";

export const mockFaktasiderMenuData: MenuItem[] = [
  {
    path: faktaSideMockContext.slug,
    tittel: faktaSideMockContext.title || "test",
    språk: faktaSideMockContext.lang,
    tilgjengeligPåValgtSpråk: true,
    beskrivelse: faktaSideMockContext.beskrivelse || "beskrivelse",
    nokkelordBeskrivelse: "Arbeid, CV, Dagpenger",
    id: faktaSideMockContext.id,
    type: "internal",
  },
  {
    path: "/no/arbeidsledig/",
    tittel: "Arbeidsledig",
    språk: "no",
    tilgjengeligPåValgtSpråk: true,
    beskrivelse: "Har du blitt arbeidsledig, kan du ha rett til økonomisk støtte og hjelp til å komme i arbeid.",
    nokkelordBeskrivelse: "",
    id: "-89eddf21-6b78-5f89-8d1f-7f5f8ebfe735",
    type: "internal",
  },
  {
    type: "external",
    url: "https://www.nav.no/ekstern/side",
    tittel: "Ekstern lenke",
    beskrivelse: "Hit kan du gå for å lese om spennende eksterne ting",
  },
];
