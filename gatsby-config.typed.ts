import dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const secretSanityToken = process.env.SANITY_READ_TOKEN;
const isProd = process.env.NODE_ENV === 'production';

export const pathPrefix = `/arbeid`;

export const siteMetadata = {
  title: `Dagpenger - www.nav.no`,
  description: `Dagpenger som arbeidsledig eller permittert`,
  author: `NAV`,
};

export const plugins = [
  `gatsby-plugin-react-helmet`,
  'gatsby-plugin-typescript',
  'nav-decorator',
  'gatsby-plugin-less',
  'gatsby-plugin-styled-components',
  'gatsby-plugin-meta-redirect',
  {
    resolve: 'gatsby-source-sanity',
    options: {
      projectId: 'rt6o382n',
      dataset: process.env.DATASET || 'production',
      token: secretSanityToken,
      watchMode: !isProd,
      overlayDrafts: !isProd && secretSanityToken,
    },
  },
];
