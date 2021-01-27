import withErrorBoundary from "../components/withErrorBoundary";
import { GetStaticPaths, GetStaticProps } from "next";
import { SupportedLanguage } from "../i18n/supportedLanguages";
import fetchFaktaside from "../hooks/graphQl/fetchFaktaside";
import Faktaside from "../components/faktaside/Faktaside";
import { groq } from "next-sanity";
import { sanityClient } from "../sanity/sanity-config";

const pathsQuery = groq`*[_type == "faktaSide"][].slug.current`;

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const faktasidePaths = await sanityClient.fetch(pathsQuery);
  const paths = faktasidePaths.map((slug) => ({ params: { slug } }));
  return {
    paths,
    fallback: true, // må settes til true for at sider som ikke er oversatt til norsk skal vises
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const lang = context.locale as SupportedLanguage;
  const faktaside = await fetchFaktaside(lang, context.params!.slug as string);

  return {
    props: {
      data: JSON.parse(JSON.stringify(faktaside)),
    },
    revalidate: 300,
  };
};

export default withErrorBoundary(Faktaside, "FaktaSide");
