import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { theme } from './theme';
import './index.less';

const Styling = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    html {
        font-size: 110%;
        font-family: 'Source Sans Pro', sans-serif;
    }
    body {
        background-color: ${theme.colors.bakgrunn};
    }

    // :target = valgt i url (url-fragment), sørger for at header ikke ligger klint oppi toppen ved bruk av interne url'er https://css-tricks.com/hash-tag-links-padding/
    :target, .internUrl {
        position: relative;
        &:focus {
        outline: none;
        box-shadow: none;
            &::after {
              content: '';
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 100%;
              ${theme.focus};
              border-radius: .2rem;
              pointer-events: none;
            }
        }
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
