import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { TranslationsProvider } from '../i18n/i18nextConfig';
import { VisForContextProvider } from '../components/BlockContent/VisFor/VisForContext';
import { DevContextProvider } from '../components/DevKnapper/DevContext';
import { LocaleProvider } from '../i18n/LocaleContext';

// https://testing-library.com/docs/react-testing-library/setup#custom-render
const AllTheProviders = ({ children }) => (
  <LocaleProvider lang="no">
    <VisForContextProvider>
      <DevContextProvider>
        <TranslationsProvider>{children}</TranslationsProvider>
      </DevContextProvider>
    </VisForContextProvider>
  </LocaleProvider>
);

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
  // @ts-ignore
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
