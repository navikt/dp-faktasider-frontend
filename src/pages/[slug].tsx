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
import NavFrontendSpinner from "nav-frontend-spinner";
import { supportedLanguages } from "../i18n/supportedLanguages";
import { useRouter } from "next/router";

const pathsQuery = groq`*[_type == "faktaSide"][].slug.current`;

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const faktasidePaths = await sanityClient.fetch(pathsQuery);

  const paths = faktasidePaths.flatMap((slug) => supportedLanguages.map((locale) => ({ params: { slug }, locale })));

  return {
    paths,
    fallback: false,
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

  if (!faktaside?.faktaside?.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      faktasideData: faktaside,
      menuData: menuData,
      preview,
      slug,
    },
  };
};

function PreviewWrapper(props: Props) {
  const router = useRouter();
  const enablePreview = !!props.preview || !!router.query.preview;

  const { data: faktasideData } = usePreviewSubscription(faktasideQuery, {
    params: { slug: props.slug },
    initialData: props.faktasideData,
    enabled: enablePreview,
  });

  const { data: menuData } = usePreviewSubscription(menuQuery, {
    initialData: props.menuData,
    enabled: enablePreview,
  });

  const locale = useLocale();

  if (!faktasideData?.faktaside?.id) {
    return <NavFrontendSpinner />;
  }

  const parsedFaktasideData = parseFaktasideData(faktasideData, locale);
  const parsedMenuData = parseMenuData(menuData, locale);

  return <Faktaside {...parsedFaktasideData} menuData={parsedMenuData} />;
}

export default withErrorBoundary(PreviewWrapper, "FaktaSide");
