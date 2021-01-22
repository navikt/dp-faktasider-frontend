import React, { ReactNode } from "react";
import { act, render, RenderOptions } from "@testing-library/react";
import { i18nextConfig, TranslationsProvider } from "../i18n/i18nextConfig";
import { VisForContextProvider } from "../components/BlockContent/VisFor/VisForContext";
import { DevContextProvider } from "../components/DevKnapper/DevContext";
import { SupportedLanguage } from "../i18n/supportedLanguages";

// https://testing-library.com/docs/react-testing-library/setup#custom-render
const AllTheProviders = (lang: SupportedLanguage): React.FunctionComponent<any> => (props: { children: ReactNode }) => {
  act(() => {
    i18nextConfig.changeLanguage(lang);
  });

  return (
    <VisForContextProvider>
      <DevContextProvider>
        <TranslationsProvider>{props.children}</TranslationsProvider>
      </DevContextProvider>
    </VisForContextProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">,
  lang: SupportedLanguage = "no"
) => render(ui, { wrapper: AllTheProviders(lang), ...options });

export * from "@testing-library/react";

export { customRender as render };
