import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";
import { kalkulatorSchemas } from "./kalkulator";
import infosideSchemas from "../npm-package-candidate/sanity/schema";
import { NotifikasjonBoolean } from "../npm-package-candidate/sanity/schemas/notifikasjon/notifikasjon";

const customComponentKeys = ["DagpengeKalkulator - normal", "DagpengeKalkulator - lærling"];

const notifikasjonsBooleans: NotifikasjonBoolean[] = [
  {
    name: "visPaaKalkulator",
    label: "Vis på dagpengekalkulatoren",
  },
  {
    name: "visPaaInnsyn",
    label: "Vis på innsynsløsninga på dine-dagpenger",
  },
];

export default createSchema({
  name: "dagpenger-info",
  types: schemaTypes.concat([
    ...kalkulatorSchemas,
    ...infosideSchemas({
      customComponentKeys: customComponentKeys,
      ekstraNotifikasjonsBooleans: notifikasjonsBooleans,
    }),
  ]),
});
