import React from "react";
import withErrorBoundary from "./withErrorBoundary";
import Head from "next/head";
import { useRouter } from "next/router";

interface Props {
  title: string;
  description: string;
}

const navUrl = "https://www.nav.no";

function SEO(props: Props) {
  const { basePath, asPath } = useRouter();
  const cannonical = `${navUrl}${basePath}${asPath}`;

  return (
    <Head>
      <title>{props.title} | www.nav.no</title>
      <link rel="canonical" href={cannonical} />
      <meta name="description" content={props.description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:site_name" content={props.title} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:title" content={props.title} />
      <meta property="twitter:description" content={props.description} />
    </Head>
  );
}

export default withErrorBoundary(SEO, "SEO");
