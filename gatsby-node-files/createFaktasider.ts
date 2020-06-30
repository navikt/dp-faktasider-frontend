import { GatsbyNode } from 'gatsby';
import { supportedLanguages } from '../src/i18n/supportedLanguages';

export const createFaktasider: GatsbyNode['createPages'] = async (props) => {
  const { graphql, actions, reporter } = props;
  const result = await graphql(`
    query Pages {
      pages: allSanityFaktaSide {
        edges {
          node {
            id
            _rawInnhold
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
        component: require.resolve('../src/templates/faktaside/FaktaSide.tsx'),
        context: { id, lang },
      });
    });
  });
};
