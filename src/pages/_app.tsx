import ErrorBoundary from "../components/ErrorBoundary";
import { VisForContextProvider } from "../components/BlockContent/VisFor/VisForContext";
import { DevContextProvider } from "../components/DevKnapper/DevContext";
import { i18nextConfig, TranslationsProvider } from "../i18n/i18nextConfig";
import { AppStyling, GlobalStyling } from "../styles/GlobalStyling";
import { AppProps } from "next/app";
import "../styles/index.less";
import { useRouter } from "next/router";
import React from "react";
import PreviewBanner from "../components/Preview/PreviewBanner";
import { PreviewContextProvider } from "../components/Preview/previewContext";
import DevKnapper from "../components/DevKnapper/DevKnapper";

function App({ Component, pageProps }: AppProps) {
  const locale = useRouter().locale;
  locale && i18nextConfig.changeLanguage(locale);

  return (
    <ErrorBoundary>
      <VisForContextProvider>
        <DevContextProvider>
          <TranslationsProvider>
            <PreviewContextProvider>
              <AppStyling className="typo-normal app">
                <DevKnapper />
                <PreviewBanner />
                <GlobalStyling />
                <Component {...pageProps} />
              </AppStyling>
            </PreviewContextProvider>
          </TranslationsProvider>
        </DevContextProvider>
      </VisForContextProvider>
    </ErrorBoundary>
  );
}

export default App;
