import React from 'react';
import { Helmet } from 'react-helmet';
import { SupportedLanguage } from '../i18n/supportedLanguages';
import withErrorBoundary from './withErrorBoundary';
import { graphql, useStaticQuery } from 'gatsby';
import { getUnixTime } from 'date-fns';

interface Props {
  title: string;
  description: string;
  lang: SupportedLanguage;
  publiseringsTidspunkt?: string;
}

interface SEOData {
  site: {
    siteMetadata: {
      imagePath: string;
      siteUrl: string;
    };
  };
}

function SEO(props: Props) {
  const data: SEOData = useStaticQuery(graphql`
    query SEO {
      site {
        siteMetadata {
          imagePath
          siteUrl
        }
      }
    }
  `);
  const metaData = data.site.siteMetadata;

  const imageUrl = metaData.siteUrl + metaData.imagePath;

  return (
    <Helmet
      htmlAttributes={{
        lang: props.lang,
      }}
      title={props.title}
      titleTemplate={`%s | www.nav.no`}
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
        {
          property: `og:updated_time`,
          content: getUnixTime(new Date(props.publiseringsTidspunkt || '')),
        },
      ]}
    />
  );
}

export default withErrorBoundary(SEO, 'SEO');
