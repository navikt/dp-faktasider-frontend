import { groq } from "next-sanity";

const innholdFields = `
[] {
  ...,
  "deltTekst": deltTekst->
}`;

export const faktasideQueryById = groq`{
  'faktaside': *[_type == "faktaSide" && _id == $id][0] {
    ...,
    "id": _id,
    "slug": slug.current,
    innhold {
      no ${innholdFields},
      en ${innholdFields},
      _type
    }
  },
  'oppsett': *[_id == "oppsett"][0] {
    seoImage,
    title,
    folketrygdensGrunnbellop,
    snarveier
  },
  'situasjonsvalg': *[_type == "situasjon"],
  'notifikasjoner': *[_type == "notifikasjon" && *[_type == "faktaSide" && _id == $id][0]._id in visPaaFaktaSider]
}`;
