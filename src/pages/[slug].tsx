import React from "react";
import { withErrorBoundary } from "../components/withErrorBoundary";
import { GetStaticPaths, GetStaticProps } from "next";
import Faktaside from "../components/faktaside/Faktaside";
import { groq } from "next-sanity";
import { sanityClient } from "../sanity/sanity-config";
import { faktasideQuery, FaktasideQueryData } from "../sanity/groq/faktaside/faktasideQuery";
import { menuQuery, MenuQueryData } from "../sanity/groq/menu/menuQuery";
import { supportedLanguages } from "../i18n/supportedLanguages";
import { useSanityPreveiw } from "../sanity/useSanityPreview";

const pathsQuery = groq`*[_type == "faktaSide"][].slug.current`;

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const faktasidePaths = await sanityClient.fetch(pathsQuery);
  const paths = faktasidePaths.flatMap((slug: string) =>
    supportedLanguages.map((locale) => ({ params: { slug }, locale }))
  );

  return {
    paths,
    fallback: "blocking",
  };
};

export interface FaktasideStaticProps {
  faktasideQueryData: FaktasideQueryData;
  menuQueryData: MenuQueryData;
  slug: string;
}

export const getStaticProps: GetStaticProps<FaktasideStaticProps> = async (context) => {
  const slug = context.params!.slug as string;

  const faktaside: FaktasideQueryData = await sanityClient.fetch(faktasideQuery, { slug });
  const menuData: MenuQueryData = await sanityClient.fetch(menuQuery);

  return {
    props: {
      faktasideQueryData: faktaside,
      menuQueryData: menuData,
      slug,
    },
    revalidate: 120,
  };
};

function PreviewWrapper(props: FaktasideStaticProps) {
  const faktasideData = useSanityPreveiw(props.faktasideQueryData, faktasideQuery, { slug: props.slug });
  const menuData = useSanityPreveiw(props.menuQueryData, menuQuery);

  return <Faktaside faktasideQueryData={faktasideData} menuQueryData={menuData} />;
}

export default withErrorBoundary(PreviewWrapper, "FaktaSide");
