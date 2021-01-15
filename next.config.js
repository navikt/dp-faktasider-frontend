const withLess = require("@zeit/next-less");

const navFrontendModuler = Object.keys(
  require("./package.json").dependencies
).filter((it) => it.startsWith("nav-"));

const withTranspileModules = require("next-transpile-modules")(
  navFrontendModuler
);

module.exports = withTranspileModules(
  withLess({
    i18n: {
      locales: ['no', 'en'],
      defaultLocale: 'no'
    },
  })
);
