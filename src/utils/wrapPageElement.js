import React from 'react';
import { AppStyling, GlobalStyling } from '../styles/GlobalStyling';
import ErrorBoundary from '../components/ErrorBoundary';
import { I18nextProvider } from 'react-i18next';
import i18nextConfig from '../i18n/i18nextConfig';
import { LocaleProvider } from '../i18n/LocaleContext';
import { VisForContextProvider } from '../components/BlockContent/VisFor/VisForContext';
import { DevContextProvider } from '../components/DevKnapper/DevContext';

const wrapPageElement = ({ element, props }) => {
  const path = props.path || props.location.pathname || '';
  const lang = path.includes('/en/') ? 'en' : 'no';
  i18nextConfig.changeLanguage(lang);

  return (
    <ErrorBoundary>
      <LocaleProvider lang={lang}>
        <VisForContextProvider>
          <DevContextProvider>
            <I18nextProvider i18n={i18nextConfig}>
              <AppStyling {...props} className="typo-normal">
                <GlobalStyling />
                <>{element}</>
              </AppStyling>
            </I18nextProvider>
          </DevContextProvider>
        </VisForContextProvider>
      </LocaleProvider>
    </ErrorBoundary>
  );
};

export default wrapPageElement;
