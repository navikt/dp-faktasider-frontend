import withErrorBoundary from "../components/withErrorBoundary";
import { GetStaticPaths, GetStaticProps } from "next";
import Faktaside from "../components/faktaside/Faktaside";
import { groq } from "next-sanity";
import { getClient, sanityClient } from "../sanity/sanity-config";
import { FaktasideQueryData } from "../sanity/groq/faktaside/faktasideQuery";
import { parseFaktasideData } from "../sanity/groq/faktaside/parseFaktasideData";
import { useLocale } from "../i18n/useLocale";
import { MenuQueryData } from "../sanity/groq/menu/menuQuery";
import { parseMenuData } from "../sanity/groq/menu/parseMenuData";
import { faktasideQuery } from "../sanity/groq/faktaside/faktasideQuery";
import { menuQuery } from "../sanity/groq/menu/menuQuery";

const pathsQuery = groq`*[_type == "faktaSide"][].slug.current`;

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const faktasidePaths = await sanityClient.fetch(pathsQuery);
  const paths = faktasidePaths.map((slug) => ({ params: { slug } }));
  return {
    paths,
    fallback: true, // må settes til true for at sider som ikke er oversatt til norsk skal vises
  };
};

interface Props {
  data: FaktasideQueryData;
  menuData: MenuQueryData;
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const slug = context.params!.slug as string;
  const faktaside: FaktasideQueryData = await getClient(!!context.preview).fetch(faktasideQuery, { slug });
  const menuData: MenuQueryData = await getClient(!!context.preview).fetch(menuQuery);

  return {
    props: {
      data: faktaside,
      menuData: menuData,
    },
    revalidate: 300,
  };
};

function PreviewWrapper(props: Props) {
  const locale = useLocale();
  return <Faktaside {...parseFaktasideData(props.data, locale)} menuData={parseMenuData(props.menuData, locale)} />;
}

export default withErrorBoundary(PreviewWrapper, "FaktaSide");
