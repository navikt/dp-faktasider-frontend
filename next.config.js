/* eslint-disable @typescript-eslint/no-var-requires */
const csp = require("./csp");

const config = {
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  basePath: "/arbeid",
  productionBrowserSourceMaps: true,
  output: "standalone",
  publicRuntimeConfig: {},
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
        source: "/arbeidsledig-permittert",
        destination: "https://www.nav.no/arbeidsledig-permittert",
        permanent: true,
      },
    ];
  },
};

exports = config;
