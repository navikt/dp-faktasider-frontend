import React from "react";
import { SupportedLanguage } from "../i18n/supportedLanguages";
import withErrorBoundary from "./withErrorBoundary";
import Head from "next/head";

interface Props {
  title: string;
  description: string;
  lang: SupportedLanguage;
  slug: string;
}

function SEO(props: Props) {
  const siteUrl = "https://www.nav.no/arbeid/";
  const imageUrl = "https://www.nav.no/arbeid/images/navlogo.png";

  return (
    <Head>
      <title>{props.title} | www.nav.no</title>
      <link rel="canonical" href={`${siteUrl}/${props.slug}`} />
      <meta name="description" content={props.description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:site_name" content={props.title} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:title" content={props.title} />
      <meta property="twitter:description" content={props.description} />
      <meta property="twitter:image" content={imageUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="image" content={imageUrl} />
    </Head>
  );
}

export default withErrorBoundary(SEO, "SEO");
