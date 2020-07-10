import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { i18nextConfig, TranslationsProvider } from '../i18n/i18nextConfig';
import { VisForContextProvider } from '../components/BlockContent/VisFor/VisForContext';
import { DevContextProvider } from '../components/DevKnapper/DevContext';
import { LocaleProvider } from '../i18n/LocaleContext';
import { SupportedLanguage } from '../i18n/supportedLanguages';

// https://testing-library.com/docs/react-testing-library/setup#custom-render
const AllTheProviders = (lang: SupportedLanguage) => ({ children }) => {
  i18nextConfig.changeLanguage(lang);
  return (
    <LocaleProvider lang={lang}>
      <VisForContextProvider>
        <DevContextProvider>
          <TranslationsProvider>{children}</TranslationsProvider>
        </DevContextProvider>
      </VisForContextProvider>
    </LocaleProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
  lang: SupportedLanguage = 'no'
) =>
  // @ts-ignore
  render(ui, { wrapper: AllTheProviders(lang), ...options });

export * from '@testing-library/react';

export { customRender as render };
