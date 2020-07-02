import { GatsbyNode } from 'gatsby';
import { createFaktasider } from './gatsby-utils/createFaktasider';
import { createRedirectsFraGamleSider } from './gatsby-utils/createRedirectsFraGamleSider';

export const createPages: GatsbyNode['createPages'] = async (props) => {
  props.reporter.info(`🛠 Lager redirect fra /admin til https://dagpenger.sanity.studio/`);
  props.actions.createRedirect({ fromPath: `/admin`, toPath: `https://dagpenger.sanity.studio/`, isPermanent: true });

  // @ts-ignore
  createRedirectsFraGamleSider(props);
  // @ts-ignore
  await createFaktasider(props);
};
