// Tar vare på gamle lenker og hash-lenker ved migrering til ny app (gammel app: dp-veiviser-ui)  Gammel app var hostet under /arbeid/dagpenger og ny app hostes under /arbeid. Gammel app hadde æøå og spesialtegn i url og hash-lenke, ny har ikke det, så her må det gjøres litt konverteringer.  Denne redirecten bør kunne fjernes etter noen måneder, men kan være lurt å sette på en metrikk først for å se hvor ofte den brukes.
import { isDevelopment } from "../utils/environment";

// @ts-ignore
export const createTestdataPage: GatsbyNode["createPages"] = (props) => {
  if (isDevelopment()) {
    props.actions.createPage({
      path: "/testdata",
      component: require.resolve("../src/templates/VisTestdata.tsx"),
      context: undefined,
    });
  }
};
