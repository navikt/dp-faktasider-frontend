import { SupportedLanguage, supportedLanguages } from "../src/i18n/supportedLanguages";
import { isDevelopment } from "../src/utils/environment";

export interface LandingssideProps {
  lang: SupportedLanguage;
}

// @ts-ignore
export const createLandingsside: GatsbyNode["createPages"] = async (props) => {
  const { reporter, actions } = props;
  reporter.info(`🚧 Lager redirect fra / til /no/`);
  actions.createRedirect({ fromPath: `/`, toPath: `/no/`, isPermanent: true, redirectInBrowser: isDevelopment() });
  supportedLanguages.forEach((lang) => {
    const slug = `/${lang}/`;
    reporter.info(`🛬 Lager landingsside: ${slug}`);
    actions.createPage<LandingssideProps>({
      path: slug,
      component: require.resolve("../src/templates/landingsside/index.tsx"),
      context: { lang },
    });
  });
};
