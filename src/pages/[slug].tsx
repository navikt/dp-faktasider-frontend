import withErrorBoundary from "../components/withErrorBoundary";
import { GetStaticProps } from "next";
import fetchFaktasidePaths from "../hooks/graphQl/fetchFaktasidePaths";
import { SupportedLanguage } from "../i18n/supportedLanguages";
import fetchFaktaside from "../hooks/graphQl/fetchFaktaside";
import fetchFaktasiderMenuData from "../hooks/graphQl/fetchFaktasiderMenuData";
import Faktaside from "../components/faktaside/Faktaside";

export const getStaticProps: GetStaticProps = async (context) => {
  const lang = context.locale as SupportedLanguage;
  try {
    const faktaside = await fetchFaktaside(lang, context.params!.slug as string);
    const menuData = await fetchFaktasiderMenuData(lang);

    return {
      props: {
        ...JSON.parse(JSON.stringify(faktaside)),
        path: "random",
        menuData,
      },
      revalidate: 300,
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export async function getStaticPaths() {
  const faktasidePaths = await fetchFaktasidePaths();
  const paths = faktasidePaths.map((side) => ({
    params: { slug: side.slug.current },
  }));
  return {
    paths,
    fallback: true, // må settes til true for at sider som ikke er oversatt til norsk skal vises
  };
}

export default withErrorBoundary(Faktaside, "FaktaSide");
