import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { theme } from './theme';
import './index.less';
import { useDekoratorPopdownOffset } from '../templates/faktaside/Navigasjonsmeny/useDekoratorPopdownOffset';

const Styling = createGlobalStyle<{ dekoratorOffset: number }>`
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
      --offset-top: calc(2rem + ${(props) => props.dekoratorOffset}px);
        &::before {
            content: "";
            display: block;
            height: var(--offset-top);
            margin-top: calc(var(--offset-top) * -1);
        }
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
              height: calc(100% - var(--offset-top));
              ${theme.focus};
              border-radius: .2rem;
            }
        }
    }
    
    .ReactCollapse--collapse {
        transition: height 0.3s;
    }
`;

export function GlobalStyling() {
  const offset = useDekoratorPopdownOffset();
  return <Styling dekoratorOffset={offset} />;
}

/* Scoper denne stylingen så den ikke overskriver styling i Meny/Dekorator */
export const AppStyling = styled.div`
  *:focus {
    ${theme.focus};
    border-radius: 0.2rem;
  }
`;
