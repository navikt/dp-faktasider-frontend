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
  i18n: {
    locales: ["no", "en"],
    defaultLocale: "no",
    localeDetection: false, // vi har ikke bra nok engelsk språkstøtte til at dette er bra
  },
};

module.exports = withTranspileModules(config);
