import link from "../richText/annotations/link";
import { decorators, styles } from "../richText/richText";
import visForAnnotationDeltTekst from "../deltTekst/annotations/visForAnnotationDeltTekst";
import visForAnnotation from "../richText/annotations/visForAnnotation";

export default {
  name: "tilleggsInfoRichText",
  title: "Tillegsinfo richtext",
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
        annotations: [link, visForAnnotationDeltTekst, visForAnnotation],
      },
    },
  ],
};
