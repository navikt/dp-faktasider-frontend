const csp = {
  "default-src": ["'self'", "tjenester.nav.no", "appres.nav.no", "cdn.nav.no"],
  "script-src": [
    "'self'",
    "blob:",
    "'unsafe-inline'",
    "'unsafe-eval'",
    "appres.nav.no",
    "www.google-analytics.com",
    "www.googletagmanager.com",
    "static.hotjar.com",
    "script.hotjar.com",
    "*.psplugin.com",
    "*.nav.no",
    "arbeid.ekstern.dev.nav.no",
    "in2.taskanalytics.com",
  ],
  "style-src": [
    "'self'",
    "blob:",
    "*.nav.no",
    "arbeid.ekstern.dev.nav.no",
    "arbeid.dev.nav.no",
    "appres.nav.no",
    "'unsafe-inline'",
    "fonts.googleapis.com",
  ],
  "connect-src": [
    "'self'",
    "*.nav.no",
    "appres.nav.no",
    "amplitude.nav.no/collect",
    "*.psplugin.com",
    "*.hotjar.com",
    "*.vc.hotjar.com",
    "*.vc.hotjar.io:*",
    "*.surveystats.hotjar.io",
    "api.puzzel.com",
    "nav.boost.ai",
    "rt6o382n.api.sanity.io",
    "ta-survey-v2.herokuapp.com",
    "in2.taskanalytics.com",
  ],
  "font-src": ["data:", "*.psplugin.com", "*.hotjar.com", "fonts.gstatic.com", "cdn.nav.no"],
  "frame-src": ["video.qbrick.com/", "vars.hotjar.com", "player.vimeo.com"],
  "img-src": ["*.hotjar.com", "www.google-analytics.com", "*.nav.no", "data:"],
};

const stringified = Object.entries(csp)
  .map((entry) => `${entry[0]} ${entry[1].join(" ")}`)
  .join("; ");

module.exports = stringified;
