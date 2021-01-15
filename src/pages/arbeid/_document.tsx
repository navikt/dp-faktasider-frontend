import Document, { Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import { NextPageContext } from "next";
import { RenderPage } from "next/dist/next-server/lib/utils";
import getDekoratøren from "../../dekoratøren/dekoratøren";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const styledComponentsStylesheet = await renderServersideStyledComponentsStylesheet(ctx);
    const dekoratøren = await getDekoratøren();
    return { ...styledComponentsStylesheet, ...dekoratøren };
  }

  render() {
    const { Styles, Scripts, Header, Footer } = this.props as any;

    return (
      <Html>
        <Head /> {/* Head må først inn, så kan neste blokk inserte elementer */}
        <Head>
          {Styles}
          {Scripts}
        </Head>
        <body>
        {Header}
        <Main />
        {Footer}
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
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
      });
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      )
    };
  } finally {
    sheet.seal();
  }
}