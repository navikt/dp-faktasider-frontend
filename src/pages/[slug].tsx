import withErrorBoundary from "../components/withErrorBoundary";
import { GetStaticPaths, GetStaticProps } from "next";
import Faktaside from "../components/faktaside/Faktaside";
import { groq } from "next-sanity";
import { getClient, sanityClient, usePreviewSubscription } from "../sanity/sanity-config";
import { FaktasideQueryData } from "../sanity/groq/faktaside/faktasideQuery";
import { parseFaktasideData } from "../sanity/groq/faktaside/parseFaktasideData";
import { useLocale } from "../i18n/useLocale";
import { MenuQueryData } from "../sanity/groq/menu/menuQuery";
import { parseMenuData } from "../sanity/groq/menu/parseMenuData";
import { faktasideQuery } from "../sanity/groq/faktaside/faktasideQuery";
import { menuQuery } from "../sanity/groq/menu/menuQuery";
import { isDevelopment } from "../utils/environment";

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
  faktasideData: FaktasideQueryData;
  menuData: MenuQueryData;
  preview: boolean;
  slug: string;
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const preview = !!context.preview || isDevelopment();
  const slug = context.params!.slug as string;
  const faktaside: FaktasideQueryData = await getClient(preview).fetch(faktasideQuery, { slug });
  const menuData: MenuQueryData = await getClient(preview).fetch(menuQuery);

  return {
    props: {
      faktasideData: faktaside,
      menuData: menuData,
      preview,
      slug,
    },
    revalidate: 300,
  };
};

function PreviewWrapper(props: Props) {
  const { data: faktasideData } = usePreviewSubscription(faktasideQuery, {
    params: { slug: props.slug },
    initialData: props.faktasideData,
    enabled: props.preview,
  });

  const { data: menuData } = usePreviewSubscription(menuQuery, {
    initialData: props.menuData,
    enabled: props.preview,
  });

  const locale = useLocale();
  const parsedFaktasideData = parseFaktasideData(faktasideData, locale);
  const parsedMenuData = parseMenuData(menuData, locale);

  return <Faktaside {...parsedFaktasideData} menuData={parsedMenuData} />;
}

export default withErrorBoundary(PreviewWrapper, "FaktaSide");
