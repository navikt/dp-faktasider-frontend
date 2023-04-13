/* eslint-disable @typescript-eslint/no-var-requires */
const csp = require("./csp");
const { withSentryConfig } = require("@sentry/nextjs");

const config = {
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  basePath: "/arbeid",
  productionBrowserSourceMaps: true,
  output: "standalone",
  publicRuntimeConfig: {
    NEXT_PUBLIC_SENTRY_STAGE: process.env.NEXT_PUBLIC_SENTRY_STAGE,
  },
  i18n: {
    locales: ["no", "en"],
    defaultLocale: "no",
    localeDetection: false, // vi har ikke bra nok engelsk språkstøtte til at dette er bra
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: csp,
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/arbeidsledig",
        destination: "https://www.nav.no/dagpenger",
        permanent: true,
      },
      {
        source: "/permittert",
        destination: "https://www.nav.no/dagpenger",
        permanent: true,
      },
      {
        source: "/dagpenger",
        destination: "https://www.nav.no/dagpenger",
        permanent: true,
      },
      {
        source: "/en/dagpenger-og-eos",
        destination: "https://www.nav.no/dagpenger",
        permanent: true,
      },
    ];
  },
};

// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options.

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
  errorHandler: (err, invokeErr, compilation) => {
    compilation.warnings.push("Sentry CLI Plugin: " + err.message);
  },
};

module.exports = withSentryConfig(config, sentryWebpackPluginOptions);
