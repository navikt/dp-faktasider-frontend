import { groq } from "next-sanity";

export const domeneTittelQuery = groq`*[_type == 'oppsett'][0].title.no`;
