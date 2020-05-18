/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
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
            _rawTitle
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const pageEdges = result.data.pages.edges || [];

  pageEdges.forEach((edge) => {
    const id = edge.node.id;
    const slug = edge.node.slug.current;

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

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createPages(graphql, actions, reporter);
};
