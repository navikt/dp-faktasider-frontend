import React from 'react';
import { AppStyling, GlobalStyling } from '../styles/GlobalStyling';
import { LocaleProvider } from '../locales/LocaleContext';
import ErrorBoundary from '../components/ErrorBoundary';

const wrapPageElement = ({ element, props }) => (
  <ErrorBoundary>
    <LocaleProvider defaultLang={props.pageContext.lang}>
      <AppStyling {...props} className="typo-normal">
        <GlobalStyling />
        <>{element}</>
      </AppStyling>
    </LocaleProvider>
  </ErrorBoundary>
);

export default wrapPageElement;
