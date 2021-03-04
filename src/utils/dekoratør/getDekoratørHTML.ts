import { fetchDecoratorHtml } from "@navikt/nav-dekoratoren-moduler/ssr";

async function getDekoratørHtml() {
  return await fetchDecoratorHtml({
    env: "prod",
    breadcrumbs: [
      { title: "Forside", url: "https://www.nav.no/arbeid" },
      { title: "Underside", url: "https://www.nav.no" },
    ],
    context: "privatperson",
  });
}

export default getDekoratørHtml;
