const withLess = require("@zeit/next-less");

const navFrontendModuler = Object.keys(require("./package.json").dependencies).filter(
  (it) => it.startsWith("nav-") || it.startsWith("@navikt/")
);

const withTranspileModules = require("next-transpile-modules")(navFrontendModuler);

const csp = require("./csp");

const isDevelopment = process.env.NODE_ENV === "development";

const SANITYSTUDIO_REWRITE = isDevelopment ? {
  source: "/studio/:path*",
  destination: "http://localhost:3333/arbeid/studio/:path*",
} : {
  source: "/studio/:path*",
  destination: "/studio/index.html"
};

module.exports = withTranspileModules(
  withLess({
    basePath: "/arbeid",
    rewrites: () => [SANITYSTUDIO_REWRITE],
    async headers() {
      return [
        {
          source: "/:path*",
          headers: [
            {
              key: "Content-Security-Policy",
              value: csp
            }
          ]
        },
        {
          source: "/studio/:path*",
          headers: [
            {
              key: "Content-Security-Policy",
              value: '' // Skrur av csp for sanity studio
            }
          ]
        }
      ];
    },
    i18n: {
      locales: ["no", "en"],
      defaultLocale: "no",
      localeDetection: false // vi har ikke bra nok engelsk språkstøtte til at dette er bra
    }
  })
);
