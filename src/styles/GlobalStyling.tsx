import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { theme } from './theme';
import './index.less';

const Styling = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    a {
        word-break: break-word;
    }
    html {
        font-size: 115%;
        font-family: 'Source Sans Pro', sans-serif;
    }
    body {
        background-color: ${theme.colors.bakgrunn};
    }
    
    .ReactCollapse--collapse {
        transition: height 0.3s;
    }
`;

export function GlobalStyling() {
  return <Styling />;
}

/* Scoper denne stylingen så den ikke overskriver styling i Meny/Dekorator */
export const AppStyling = styled.div`
  *:focus {
    ${theme.focus};
    border-radius: 0.2rem;
  }
`;
