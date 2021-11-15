import { groq } from "next-sanity";

export const historiskFaktasideQuery = groq`*[_type == "faktaSide"]{
  _id,
  _updatedAt,
  title,
  slug
}`;

export const historiskGyldigeIdQuery = groq`*[_type in ["faktaSide", "deltTekst"] && !(_id in path("drafts.**"))]._id`;

export interface HistoriskFaktasideData {
  _id: string;
  _updatedAt: string;
  title: string;
  slug: Slug;
}

interface Slug {
  _type: "slug";
  current: string;
}
