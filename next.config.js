const withTranspileModules = require("next-transpile-modules")(["@navikt/ds-react", "@navikt/ds-icons"]);

const csp = require("./csp");

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

module.exports = withTranspileModules(config);
