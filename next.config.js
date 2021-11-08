const csp = require("./csp");
const { withSentryConfig } = require("@sentry/nextjs");
const withTranspileModules = require("next-transpile-modules")(["@navikt/ds-react", "@navikt/ds-icons"]);

const config = {
  basePath: "/arbeid",
  productionBrowserSourceMaps: true,
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
        source: "/student",
        destination: "/utdanning",
        permanent: true,
      },
    ];
  },
};

const moduleExports = withTranspileModules(config);

// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options.

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
