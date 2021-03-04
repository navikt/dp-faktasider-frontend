import Document, { Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import { NextPageContext } from "next";
import { RenderPage } from "next/dist/next-server/lib/utils";
import { sanityClient, urlFor } from "../sanity/sanity-config";

export default class MyDocument extends Document<{ seoImage: any }> {
  static async getInitialProps(ctx: any) {
    const styledComponentsStylesheet = await renderServersideStyledComponentsStylesheet(ctx);
    const seoImage = await sanityClient.fetch(`*[_id == "oppsett"][0].seoImage`);
    return { ...styledComponentsStylesheet, seoImage };
  }

  render() {
    const imageUrl = urlFor(this.props.seoImage).url() || "";

    return (
      <Html>
        <Head /> {/* Head må først inn, så kan neste blokk inserte elementer */}
        <Head>
          <meta property="twitter:image" content={imageUrl} />
          <meta property="og:image" content={imageUrl} />
          <meta property="image" content={imageUrl} />
        </Head>
        <body>
          <Main />
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
