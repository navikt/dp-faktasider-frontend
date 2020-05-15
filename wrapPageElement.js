import React from 'react';
import { AppStyling, GlobalStyling } from './src/styles/GlobalStyling';

const wrapPageElement = ({ element, props }) => (
  <AppStyling {...props} className="typo-normal">
    <GlobalStyling />
    <>{element}</>
  </AppStyling>
);

export default wrapPageElement;
