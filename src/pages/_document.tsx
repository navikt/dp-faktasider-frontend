import Document, { Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import { NextPageContext } from "next";
import { RenderPage } from "next/dist/next-server/lib/utils";
import fetchDekoratorReact, { DekoratorReactComponents } from "../dekoratøren/fetchDekoratorReact";
import { sanityClient, urlFor } from "../sanity/sanity-config";

export default class MyDocument extends Document<DekoratorReactComponents & { seoImage: any }> {
  static async getInitialProps(ctx: any) {
    const styledComponentsStylesheet = await renderServersideStyledComponentsStylesheet(ctx);
    const seoImage = await sanityClient.fetch(`*[_id == "oppsett"][0].seoImage`);
    const dekoratøren = await fetchDekoratorReact({
      breadcrumbs: [
        { title: "Forside", url: "https://www.nav.no/arbeid" },
        { title: "Underside", url: "https://www.nav.no" },
      ],
      context: "privatperson",
    });
    return { ...styledComponentsStylesheet, ...dekoratøren, seoImage };
  }

  render() {
    const { DekoratorStyles, DekoratorScripts, DekoratorHeader, DekoratorFooter } = this.props;
    const imageUrl = urlFor(this.props.seoImage).url() || "";

    return (
      <Html>
        <Head /> {/* Head må først inn, så kan neste blokk inserte elementer */}
        <Head>
          <DekoratorStyles />
          <DekoratorScripts />
          <meta property="twitter:image" content={imageUrl} />
          <meta property="og:image" content={imageUrl} />
          <meta property="image" content={imageUrl} />
        </Head>
        <body>
          <DekoratorHeader />
          <Main />
          <DekoratorFooter />
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
