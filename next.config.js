const withLess = require("@zeit/next-less");

const navFrontendModuler = Object.keys(require("./package.json").dependencies).filter(
  (it) => it.startsWith("nav-") || it.startsWith("@navikt/")
);

const withTranspileModules = require("next-transpile-modules")(navFrontendModuler);

const csp = require("./csp");

const STUDIO_REWRITE = {
  source: "/arbeid/studio/:path*",
  destination:
    process.env.NODE_ENV === "development" ? "http://localhost:3333/studio/:path*" : "/arbeid/studio/index.html",
};

module.exports = withTranspileModules(
  withLess({
    basePath: "/arbeid",
    rewrites: () => [STUDIO_REWRITE],
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
  })
);
