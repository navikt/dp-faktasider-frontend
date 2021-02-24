import React from "react";
import { FiLink } from "react-icons/fi";
import { localeValueRequired } from "../utils/validationHelpers";

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
      validation: localeValueRequired,
    },
    {
      title: "Url",
      name: "url",
      type: "localeUrl",
      validation: localeValueRequired,
    },
    {
      name: "visPaaForside",
      title: "Vis på nav.no/arbeid",
      type: "boolean",
    },
    {
      name: "visPaaSider",
      title: "Vis på side:",
      type: "array",
      of: [
        {
          type: "reference",
          description: 'Faktasiden må være "Published" for å dukke opp i denne lista',
          to: { type: "faktaSide" },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "tittel.no",
      subtitle: "url.no",
    },
  },
};
