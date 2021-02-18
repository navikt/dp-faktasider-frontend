const withLess = require("@zeit/next-less");

const navFrontendModuler = Object.keys(require("./package.json").dependencies).filter(
  (it) => it.startsWith("nav-") || it.startsWith("@navikt/")
);

const withTranspileModules = require("next-transpile-modules")(navFrontendModuler);

const csp = require("./csp");

const STUDIO_REWRITE = {
  source: "/studio/:path*",
  destination: process.env.NODE_ENV === "development" ? "http://localhost:3333/studio/:path*" : "/studio/index.html",
  locale: false,
};

module.exports = withTranspileModules(
  withLess({
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
    // Remove i18n-config after next build, before next start to make studio-redirect work
    i18n: {
      locales: ["no", "en"],
      defaultLocale: "no",
      localeDetection: false, // vi har ikke bra nok engelsk språkstøtte til at dette er bra
    },
  })
);
