import React from "react";
import CustomComponentPreview, { CustomComponentIkon } from "./CustomComponentPreview";

export default (customComponentKeys?: string[]) => ({
  name: "customComponent",
  title: "Komponent",
  type: "object",
  icon: CustomComponentIkon,
  fields: [
    {
      title: "Velg komponent",
      name: "komponent",
      type: "string",
      description: "Nye komponenter må opprettes av en utvikler i sanity-studio og i frontenden",
      validation: (Rule) => Rule.required(),
      options: {
        list: customComponentKeys || ["Ingen custom component er lagt inn i systemet"],
      },
    },
  ],
  preview: {
    select: {
      title: "komponent",
    },
    prepare: (selection) => selection,
    component: (props) => <CustomComponentPreview name={props.value.title} />,
  },
});
