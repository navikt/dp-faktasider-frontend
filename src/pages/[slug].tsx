import withErrorBoundary from "../components/withErrorBoundary";
import { GetStaticPaths, GetStaticProps } from "next";
import Faktaside from "../components/faktaside/Faktaside";
import { groq } from "next-sanity";
import { sanityClient } from "../sanity/sanity-config";
import { faktasideQuery, FaktasideQueryData } from "../sanity/groq/faktaside/faktasideQuery";
import { parseFaktasideData } from "../sanity/groq/faktaside/parseFaktasideData";
import { useLocale } from "../i18n/useLocale";
import { menuQuery, MenuQueryData } from "../sanity/groq/menu/menuQuery";
import { parseMenuData } from "../sanity/groq/menu/parseMenuData";
import { supportedLanguages } from "../i18n/supportedLanguages";
import { useSanityPreveiw } from "../sanity/useSanityPreview";
import React from "react";
import { Alert } from "@navikt/ds-react";
import { loggError } from "../utils/logging";

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
  slug: string;
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const slug = context.params!.slug as string;

  const faktaside: FaktasideQueryData = await sanityClient.fetch(faktasideQuery, { slug });
  const menuData: MenuQueryData = await sanityClient.fetch(menuQuery);

  if (!faktaside?.faktaside?.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      faktasideData: faktaside,
      menuData: menuData,
      slug,
    },
    revalidate: 120,
  };
};

function PreviewWrapper(props: Props) {
  const faktasideData = useSanityPreveiw(props.faktasideData, faktasideQuery, { slug: props.slug });
  const menuData = useSanityPreveiw(props.menuData, menuQuery);

  const locale = useLocale();

  if (!faktasideData?.faktaside?.id) {
    loggError(new Error("Fant ikke faktaside"));
    return <Alert variant="error">Fant ikke siden du leter etter</Alert>;
  }

  const parsedFaktasideData = parseFaktasideData(faktasideData, locale);
  const parsedMenuData = parseMenuData(menuData, locale);

  return <Faktaside {...parsedFaktasideData} menuData={parsedMenuData} />;
}

export default withErrorBoundary(PreviewWrapper, "FaktaSide");
