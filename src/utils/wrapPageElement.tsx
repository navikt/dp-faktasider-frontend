import React from "react";
import { AppStyling, GlobalStyling } from "../styles/GlobalStyling";
import ErrorBoundary from "../components/ErrorBoundary";
import { i18nextConfig, TranslationsProvider } from "../i18n/i18nextConfig";
import { LocaleProvider } from "../i18n/LocaleContext";
import { VisForContextProvider } from "../components/BlockContent/VisFor/VisForContext";
import { DevContextProvider } from "../components/DevKnapper/DevContext";

const wrapPageElement = ({ element, props }) => {
  const langFromPath = props.location.pathname.includes("/en/") ? "en" : "no";
  const lang = props.pageContext.lang || langFromPath;
  i18nextConfig.changeLanguage(lang);

  return (
    <ErrorBoundary>
      <LocaleProvider lang={lang}>
        <VisForContextProvider>
          <DevContextProvider>
            <TranslationsProvider>
              <AppStyling {...props} className="typo-normal app">
                <GlobalStyling />
                <>{element}</>
              </AppStyling>
            </TranslationsProvider>
          </DevContextProvider>
        </VisForContextProvider>
      </LocaleProvider>
    </ErrorBoundary>
  );
};

export default wrapPageElement;
