import VelgSituasjoner from "./VelgSituasjoner";
import RefArrayAsChecboxesInput from "../../../utils/RefArrayAsChecboxesInput";

export default {
  name: "visFor",
  title: "Vis for",
  type: "object",
  fields: [
    {
      type: "boolean",
      name: "skjulFor",
      title: "Ovmendt filtrering",
      description:
        'Skru på denne for å skjule teksten for valgte situasjoner istedenfor å vise. (Vil fortsatt vises dersom bruker ikke har valgt filtrering eller velger "Ingen valg passer").',
    },
    {
      title: "Situasjoner",
      name: "situasjoner",
      type: "array",
      of: [{ type: "string" }],
      inputComponent: VelgSituasjoner,
    },
    {
      title: "SituasjonerNY",
      name: "visForSituasjoner",
      type: "array",
      of: [{ type: "reference", to: [{ type: "situasjon" }] }],
      inputComponent: RefArrayAsChecboxesInput,
    },
  ],
};
