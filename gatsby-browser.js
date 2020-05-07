import { AppStyling, GlobalStyling } from './src/styles/GlobalStyling';
import React from 'react';

export const wrapRootElement = ({ element }) => {
  return (
    <AppStyling className="typo-normal">
      <GlobalStyling />
      <>{element}</>
    </AppStyling>
  );
};
