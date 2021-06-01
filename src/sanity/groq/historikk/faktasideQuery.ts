import { groq } from "next-sanity";

export const historiskFaktasideQuery = groq`*[_type == "faktaSide"]{
  _id,
  _updatedAt,
  title
}`;

export interface HistoriskFaktasideData {
  _id: string;
  _updatedAt: string;
  title: string;
}
