import link from "../richText/annotations/link";
import { decorators, styles } from "../richText/richText";
import visForAnnotation from "../richText/annotations/visForAnnotation";

export default {
  title: "Rich Text",
  name: "deltRichText",
  type: "array",
  of: [
    {
      title: "Block",
      type: "block",
      styles: [styles.normal, styles.h4, styles.h3, styles.h2, styles.h2_M_Meny, styles.h2_no_background],
      marks: {
        decorators: [
          decorators.strong,
          decorators.em,
          decorators.utkast,
          decorators.foreslattStykes,
          decorators.GtilNOK,
        ],
        annotations: [link, visForAnnotation],
      },
    },
    { type: "customComponent" },
    { type: "deltFremhevetTekst" },
    { type: "fremhevetTekst" },
    { type: "video" },
    { type: "tileggsInformasjon" },
    { type: "tidslinje" },
  ],
};
