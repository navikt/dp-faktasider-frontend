import link from "../infosider/richText/annotations/link";
import { decorators, styles } from "../infosider/richText/richText";

export default {
  title: "Notifikasjon Rich Text",
  name: "notifikasjonRichText",
  type: "array",
  of: [
    {
      title: "Block",
      type: "block",
      styles: [styles.normal],
      marks: {
        decorators: [
          decorators.strong,
          decorators.em,
          decorators.utkast,
          decorators.foreslattStykes,
          decorators.GtilNOK,
        ],
        annotations: [link],
      },
    },
  ],
};
