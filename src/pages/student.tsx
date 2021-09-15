import withErrorBoundary from "../components/withErrorBoundary";
import { GetStaticProps } from "next";
import Faktaside from "../components/faktaside/Faktaside";
import { sanityClient } from "../sanity/sanity-config";
import { faktasideQueryById } from "../sanity/groq/faktaside/faktasideQueryById";
import { menuQuery, MenuQueryData } from "../sanity/groq/menu/menuQuery";
import { useSanityPreveiw } from "../sanity/useSanityPreview";
import React from "react";
import { faktasideQuery, FaktasideQueryData } from "../sanity/groq/faktaside/faktasideQuery";
import { FaktasideStaticProps } from "./[slug]";

//todo slett meg når det ikke lenger lenkes eksternt til /student

export const getStaticProps: GetStaticProps<FaktasideStaticProps> = async (context) => {
  const studentRedirectId: string = "50093a63-4c50-446d-98ce-96c171e8d983";
  const id: string = studentRedirectId;
  const faktasideSlug: FaktasideQueryData = await sanityClient.fetch(faktasideQueryById, { id });
  const slug: string = faktasideSlug.faktaside.slug;
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
