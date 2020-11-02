import React from "react";
import { Helmet } from "react-helmet";
import { SupportedLanguage } from "../i18n/supportedLanguages";
import withErrorBoundary from "./withErrorBoundary";
import useMetadata from "../hooks/graphQl/useMetadata";

interface Props {
  title: string;
  description: string;
  lang: SupportedLanguage;
  path: string;
}

function SEO(props: Props) {
  const metaData = useMetadata();
  const imageUrl = metaData.siteUrl + metaData.imagePath;

  return (
    <Helmet
      htmlAttributes={{
        lang: props.lang,
      }}
      title={props.title}
      titleTemplate={`%s | www.nav.no`}
      link={[
        {
          rel: "canonical",
          href: `${metaData.siteUrl}${props.path}`,
        },
      ]}
      meta={[
        {
          name: `description`,
          content: props.description,
        },
        {
          property: `og:title`,
          content: props.title,
        },
        {
          property: `og:description`,
          content: props.description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:title`,
          content: props.title,
        },
        {
          name: `twitter:description`,
          content: props.description,
        },
        {
          property: `og:image`,
          content: imageUrl,
        },
        {
          property: `twitter:image`,
          content: imageUrl,
        },
        {
          property: `image`,
          content: imageUrl,
        },
      ]}
    />
  );
}

export default withErrorBoundary(SEO, "SEO");
