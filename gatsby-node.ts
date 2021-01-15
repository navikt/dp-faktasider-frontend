import { GatsbyNode } from "gatsby";
import { createFaktasider } from "./src/gatsby-utils/createFaktasider";
import { createRedirectsFraGamleSider } from "./src/gatsby-utils/createRedirectsFraGamleSider";
import { createTestdataPage } from "./src/gatsby-utils/createTestdataPage";
import { createLandingsside } from "./src/gatsby-utils/createLandingsside";

export const createPages: GatsbyNode["createPages"] = async (props) => {
  props.reporter.info(`🛠 Lager redirect fra /admin til https://dagpenger.sanity.studio/`);
  props.actions.createRedirect({ fromPath: `/admin`, toPath: `https://dagpenger.sanity.studio/`, isPermanent: true });

  // @ts-ignore
  createTestdataPage(props);
  // @ts-ignore
  createRedirectsFraGamleSider(props);
  // @ts-ignore
  await createLandingsside(props);
  // @ts-ignore
  await createFaktasider(props);
};
