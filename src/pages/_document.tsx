import {
  DecoratorEnvProps,
  DecoratorFetchProps,
  DecoratorComponentsReact,
  fetchDecoratorReact,
} from "@navikt/nav-dekoratoren-moduler/ssr";
import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";

const dekoratorEnv = (process.env.DEKORATOR_ENV || "localhost") as DecoratorEnvProps["env"];

const decoratorProps: DecoratorFetchProps = {
  env: dekoratorEnv,
  localUrl: "https://dekoratoren.ekstern.dev.nav.no",
  params: {
    chatbot: false,
    context: "privatperson",
    redirectToApp: true,
    level: "Level4",
    language: "nb",
  },
};

export default class MyDocument extends Document<DecoratorComponentsReact> {
  static async getInitialProps(ctx: DocumentContext) {
    const { locale } = ctx;
    const initialProps = await Document.getInitialProps(ctx);
    const language = locale || "nb";

    const Dekorator: DecoratorComponentsReact = await fetchDecoratorReact({
      ...decoratorProps,
    }).catch((err) => {
      const empty = () => <></>;
      return {
        Footer: empty,
        Header: empty,
        Scripts: empty,
        HeadAssets: empty,
      };
    });

    return {
      ...initialProps,
      ...Dekorator,
      locale: language,
    };
  }

  render(): JSX.Element {
    const { Scripts, Header, Footer, locale, HeadAssets } = this.props;
    return (
      <Html lang={locale}>
        <Head>
          <HeadAssets />
        </Head>
        <body>
          <Scripts />
          <Header />
          <Main />
          <Footer />
          <NextScript />
        </body>
      </Html>
    );
  }
}
