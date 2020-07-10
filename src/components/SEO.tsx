import React from 'react';
import { Helmet } from 'react-helmet';
import { SupportedLanguage } from '../i18n/supportedLanguages';
import withErrorBoundary from './withErrorBoundary';

interface Props {
  title: string;
  description: string;
  lang: SupportedLanguage;
}

function SEO(props: Props) {
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
          name: `twitter:creator`,
          content: 'NAV',
        },
        {
          name: `twitter:title`,
          content: props.title,
        },
        {
          name: `twitter:description`,
          content: props.description,
        },
      ]}
    />
  );
}

export default withErrorBoundary(SEO, 'SEO');
