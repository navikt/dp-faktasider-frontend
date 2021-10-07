import withErrorBoundary from "../components/withErrorBoundary";
import { GetStaticPaths, GetStaticProps, Redirect } from "next";
import Faktaside from "../components/faktaside/Faktaside";
import { groq } from "next-sanity";
import { sanityClient } from "../sanity/sanity-config";
import { faktasideQuery, FaktasideQueryData } from "../sanity/groq/faktaside/faktasideQuery";
import { menuQuery, MenuQueryData } from "../sanity/groq/menu/menuQuery";
import { supportedLanguages } from "../i18n/supportedLanguages";
import { useSanityPreveiw } from "../sanity/useSanityPreview";
import React from "react";

const pathsQuery = groq`*[_type == "faktaSide"][].slug.current`;

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const faktasidePaths = await sanityClient.fetch(pathsQuery);
  const paths = faktasidePaths.flatMap((slug) => supportedLanguages.map((locale) => ({ params: { slug }, locale })));

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

export const getStaticProps: GetStaticProps<FaktasideStaticProps | Redirect> = async (context) => {
  const slug = context.params!.slug as string;
  const faktasideData: FaktasideQueryData = await sanityClient.fetch(faktasideQuery, { slug });
  const menuData: MenuQueryData = await sanityClient.fetch(menuQuery);

  if (!faktasideData.faktaside) {
    return {
      redirect: {
        destination: "/404",
        statusCode: 303,
      },
    };
  }

  return {
    props: {
      faktasideQueryData: faktasideData,
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
