import React from 'react';
import { AppStyling, GlobalStyling } from '../styles/GlobalStyling';
import ErrorBoundary from '../components/ErrorBoundary';

const wrapPageElement = ({ element, props }) => (
  <ErrorBoundary>
    <AppStyling {...props} className="typo-normal">
      <GlobalStyling />
      <>{element}</>
    </AppStyling>
  </ErrorBoundary>
);

export default wrapPageElement;
