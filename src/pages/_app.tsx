import ErrorBoundary from "../components/ErrorBoundary";
import { VisForContextProvider } from "../components/BlockContent/VisFor/VisForContext";
import { DevContextProvider } from "../components/DevKnapper/DevContext";
import { i18nextConfig, TranslationsProvider } from "../i18n/i18nextConfig";
import { AppStyling, GlobalStyling } from "../styles/GlobalStyling";
import { AppProps } from "next/app";
import "../styles/index.less";
import { useRouter } from "next/router";
import { useEffect } from "react";

function App({ Component, pageProps }: AppProps) {
  const locale = useRouter().locale;
  useEffect(() => {
    locale && i18nextConfig.changeLanguage(locale);
  }, [locale]);

  return (
    <ErrorBoundary>
      <VisForContextProvider>
        <DevContextProvider>
          <TranslationsProvider>
            <AppStyling className="typo-normal app">
              <GlobalStyling />
              <Component {...pageProps} />
            </AppStyling>
          </TranslationsProvider>
        </DevContextProvider>
      </VisForContextProvider>
    </ErrorBoundary>
  );
}

export default App;
