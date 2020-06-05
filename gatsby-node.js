const supportedLanguages = ['en', 'no'];

async function createPages(graphql, actions, reporter) {
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
}

// redirects fra gamle sider fra dp-veiviser-ui. Disse bør være trygge å fjerne etter noen måneder.
const gamleSlugs = ['permittert', 'arbeidsledig', 'lærling', 'student'];
function createRedirectsFraGamleSider(actions, reporter) {
  gamleSlugs.forEach((slug) => {
    const path = `/dagpenger/${slug}`;
    reporter.info('📠 Redirect fra gammel side: ' + path);
    actions.createPage({
      path: path,
      component: require.resolve('./src/templates/RedirectFraGammelSide.tsx'),
      context: { slug },
    });
  });
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  reporter.info(`🛠 Lager redirect fra /admin til https://dagpenger.sanity.studio/`);
  actions.createRedirect({ fromPath: `/admin`, toPath: `https://dagpenger.sanity.studio/`, isPermanent: true });

  createRedirectsFraGamleSider(actions, reporter);

  await createPages(graphql, actions, reporter);
};
