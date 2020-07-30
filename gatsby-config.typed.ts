import dotenv from 'dotenv';
import csp from './gatsby-utils/csp';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const secretSanityToken = process.env.SANITY_READ_TOKEN;
const isProd = process.env.NODE_ENV === 'production';

export const pathPrefix = `/arbeid`;
const siteUrl = `https://www.nav.no${pathPrefix}`;

export const siteMetadata = {
  siteUrl: siteUrl,
  imagePath: '/images/navlogo.png',
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
  {
    resolve: `gatsby-plugin-csp`,
    options: {
      disableOnDev: true,
      reportOnly: false,
      mergeScriptHashes: false,
      mergeStyleHashes: false,
      mergeDefaultDirectives: false,
      directives: csp,
    },
  },
];
