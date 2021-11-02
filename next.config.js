const withTranspileModules = require("next-transpile-modules")(["@navikt/ds-react", "@navikt/ds-icons"]);
const csp = require("./csp");
const { withSentryConfig } = require("@sentry/nextjs");

const config = {
  basePath: "/arbeid",
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
  i18n: {
    locales: ["no", "en"],
    defaultLocale: "no",
    localeDetection: false, // vi har ikke bra nok engelsk språkstøtte til at dette er bra
  },
};

const moduleExports = withTranspileModules(config);

// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options.

const sentryWebpackPluginOptions = {
  //silent: true, // Suppresses all logs
};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
