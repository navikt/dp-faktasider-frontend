import Document, { Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import { NextPageContext } from "next";
import { RenderPage } from "next/dist/next-server/lib/utils";
import { Components, Props, fetchDecoratorReact } from "@navikt/nav-dekoratoren-moduler/ssr";

const dekoratørParams: Props = {
  // @ts-ignore
  env: process.env.DEKORATOR_MILJO || "prod",
  breadcrumbs: [
    { title: "Forside", url: "https://www.nav.no/arbeid" },
    { title: "Underside", url: "https://www.nav.no" },
  ],
  context: "privatperson",
};

export default class MyDocument extends Document<{ Dekoratøren: Components }> {
  static async getInitialProps(ctx: any) {
    const styledComponentsStylesheet = await renderServersideStyledComponentsStylesheet(ctx);
    const Dekoratøren = await fetchDecoratorReact(dekoratørParams);
    return { ...styledComponentsStylesheet, Dekoratøren };
  }

  render() {
    const { Dekoratøren } = this.props;

    return (
      <Html>
        <Head /> {/* Head må først inn, så kan neste blokk inserte elementer */}
        <Dekoratøren.Styles />
        <Dekoratøren.Scripts />
        <body>
          <Dekoratøren.Header />
          <Main />
          <Dekoratøren.Footer />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// https://github.com/vercel/next.js/blob/master/examples/with-styled-components/pages/_document.js
async function renderServersideStyledComponentsStylesheet(ctx: NextPageContext & { renderPage: RenderPage }) {
  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;
  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      ),
    };
  } finally {
    sheet.seal();
  }
}
