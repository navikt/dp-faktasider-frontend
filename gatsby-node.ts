import { GatsbyNode } from 'gatsby';

const supportedLanguages = ['en', 'no'];

const createFaktasider: GatsbyNode['createPages'] = async (props) => {
  const { graphql, actions, reporter } = props;
  const result = await graphql(`
    query Pages {
      pages: allSanityFaktaSide {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  // @ts-ignore
  const pageEdges = result.data.pages.edges || [];

  pageEdges.forEach((edge) => {
    const id = edge.node.id;
    const slug = (edge.node.slug || {}).current;

    if (!slug) {
      return;
    }

    const path = `/${slug}/`;
    reporter.info(`🛠 Lager redirect fra ${path} til /no${path}`);
    actions.createRedirect({ fromPath: `/${path}`, toPath: `/no/${path}`, isPermanent: true });

    supportedLanguages.forEach((lang) => {
      const path = `/${lang}/${slug}/`;
      reporter.info(`📄 Lager faktaside: ${path}`);
      actions.createPage({
        path,
        component: require.resolve('./src/templates/faktaside/FaktaSide.tsx'),
        context: { id, lang },
      });
    });
  });
};

// redirects fra gamle sider fra dp-veiviser-ui. Disse bør være trygge å fjerne etter noen måneder.
const gamleSlugs = ['permittert', 'arbeidsledig', 'lærling', 'student'];
const createRedirectsFraGamleSider: GatsbyNode['createPages'] = (props) => {
  gamleSlugs.forEach((slug) => {
    const path = `/dagpenger/${slug}`;
    props.reporter.info('📠 Redirect fra gammel side: ' + path);
    props.actions.createPage({
      path: path,
      component: require.resolve('./src/templates/RedirectFraGammelSide.tsx'),
      context: { slug },
    });
  });
};

export const createPages: GatsbyNode['createPages'] = async (props) => {
  props.reporter.info(`🛠 Lager redirect fra /admin til https://dagpenger.sanity.studio/`);
  props.actions.createRedirect({ fromPath: `/admin`, toPath: `https://dagpenger.sanity.studio/`, isPermanent: true });

  createRedirectsFraGamleSider(props);

  await createFaktasider(props);
};
