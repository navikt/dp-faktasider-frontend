import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";
import { kalkulatorSchemas } from "./kalkulator";
import infosideSchemas from "../npm-package-candidate/sanity/schema";

export default createSchema({
  name: "dagpenger-info",
  types: schemaTypes.concat([...kalkulatorSchemas, ...infosideSchemas]),
});
