import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { urlFor } from "../sanity/sanity-config";
import { SanityImage } from "../sanity/types";

interface Props {
  path?: string;
  title: string;
  description: string;
  seoImage?: SanityImage;
}

const navUrl = "https://www.nav.no";

export function SEO(props: Props) {
  const { basePath } = useRouter();
  const imageUrl = props.seoImage && urlFor(props.seoImage).url();
  const cannonical = `${navUrl}${basePath}${props.path ? props.path : ""}`;

  return (
    <Head>
      <title>{props.title} | www.nav.no</title>
      <link rel="canonical" href={cannonical} />
      <meta name="description" content={props.description} />
      <meta name="robots" content="noodp, noydir" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:site_name" content={props.title} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:title" content={props.title} />
      <meta property="twitter:description" content={props.description} />
      {imageUrl && (
        <>
          <meta property="twitter:image" content={imageUrl} />
          <meta property="og:image" content={imageUrl} />
          <meta property="image" content={imageUrl} />
        </>
      )}
    </Head>
  );
}
