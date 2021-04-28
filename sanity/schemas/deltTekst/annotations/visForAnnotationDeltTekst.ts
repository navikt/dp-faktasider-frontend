import visForAnnotation from "../../richText/annotations/visForAnnotation";

// TODO, denne er overflødig nå som vi har ConditionalInput, men må migrere litt data fra "visForAnnotationDeltTekst" til "visForAnnotation"
export default {
  ...visForAnnotation,
  name: "visForAnnotationDeltTekst",
  fields: visForAnnotation.fields,
};
