import React from "react";
import { FiLink } from "react-icons/fi";

export default {
  name: "eksternLenke",
  title: "Snarvei",
  type: "object",
  icon: FiLink,
  fields: [
    {
      title: "Tittel",
      name: "tittel",
      type: "localeString",
    },
    {
      title: "Url",
      name: "url",
      type: "localeUrl",
    },
  ],
  preview: {
    select: {
      title: "tittel.no",
      subtitle: "url.no",
    },
  },
};
