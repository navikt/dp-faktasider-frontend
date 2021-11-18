import React, { useEffect } from "react";
import { VisForContextProvider } from "../components/BlockContent/VisFor/VisForContext";
import { DevContextProvider } from "../components/DevKnapper/DevContext";
import { i18nextConfig, TranslationsProvider } from "../i18n/i18nextConfig";
import { AppStyling, GlobalStyling } from "../styles/GlobalStyling";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import PreviewBanner from "../components/Preview/PreviewBanner";
import { PreviewContextProvider } from "../components/Preview/previewContext";
import { DevKnapper } from "../components/DevKnapper/DevKnapper";
import "../styles/reset.css";
import "../styles/index.scss";

export default function App({ Component, pageProps }: AppProps) {
  const locale = useRouter().locale;
  useEffect(() => {
    locale && i18nextConfig.changeLanguage(locale);
  }, [locale]);

  return (
    <VisForContextProvider>
      <DevContextProvider>
        <TranslationsProvider>
          <PreviewContextProvider>
            <AppStyling className="app">
              <DevKnapper />
              <PreviewBanner />
              <GlobalStyling />
              <Component {...pageProps} />
            </AppStyling>
          </PreviewContextProvider>
        </TranslationsProvider>
      </DevContextProvider>
    </VisForContextProvider>
  );
}
