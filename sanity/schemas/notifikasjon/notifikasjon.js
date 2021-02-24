import React from "react";
import { FiAlertCircle } from "react-icons/fi";
import getPreviewTextFromBlockContent from "../utils/getPreviewTextFromBlockContent";

export default {
  type: "object",
  name: "notifikasjon",
  title: "Notifikasjon",
  icon: FiAlertCircle,
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: "localeString",
    },
    {
      name: "innhold",
      type: "localeNotifikasjonRichText",
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
      title: "title",
      innhold: "innhold",
    },
    prepare(selection) {
      let title = selection.title;
      let innhold = selection.innhold;
      return {
        title: title.no || title.en,
        subtitle: getPreviewTextFromBlockContent(innhold.no || innhold.en),
      };
    },
  },
};
