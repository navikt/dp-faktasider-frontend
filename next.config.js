const withLess = require("@zeit/next-less");
const withCss = require("@zeit/next-css");

const navFrontendModuler = Object.keys(require("./package.json").dependencies).filter(
  (it) => it.startsWith("nav-") || it.startsWith("@navikt/")
);

const withTranspileModules = require("next-transpile-modules")(navFrontendModuler);

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
  webpack5: false, // For at less skal funke
};

// @zeit/next-less, @zeit/next-css og next-transpile-modules, kan fjernes når vi har kvittet oss med less (ved å migrere til nye komponenter fra designsystemet, @navikt/ds-react)
module.exports = withTranspileModules(withCss(withLess(config)));
