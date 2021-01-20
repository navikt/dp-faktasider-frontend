import ErrorBoundary from "../components/ErrorBoundary";
import { VisForContextProvider } from "../components/BlockContent/VisFor/VisForContext";
import { DevContextProvider } from "../components/DevKnapper/DevContext";
import { TranslationsProvider } from "../i18n/i18nextConfig";
import { AppStyling, GlobalStyling } from "../styles/GlobalStyling";
import { AppProps } from "next/app";
import NextBanner from "../components/NextBanner";
import "../styles/index.less";

function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <VisForContextProvider>
        <DevContextProvider>
          <TranslationsProvider>
            <AppStyling className="typo-normal app">
              <GlobalStyling />
              <NextBanner />
              <Component {...pageProps} />
            </AppStyling>
          </TranslationsProvider>
        </DevContextProvider>
      </VisForContextProvider>
    </ErrorBoundary>
  );
}

export default App;
