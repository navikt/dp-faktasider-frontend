import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

const Styling = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  a {
    word-break: break-word;
  }

  html {
    //font-size: 100% !important;
    @media (min-width: 1400px) {
      font-size: 112.5% !important;
    }
    font-family: 'Source Sans Pro', sans-serif;
    
    &:focus-within {
      scroll-behavior: smooth;
    }
  }

  body {
    background-color: ${theme.colors.bakgrunn};
    //font-size: 1rem; // motvikrer ny styling fra designsystemet som gjør designet vår uproporsjonalt
  }

  .ReactCollapse--collapse {
    transition: height 0.3s;
  }

  .decorator-wrapper .sticky-container {
    position: static !important;
  }

`;

export function GlobalStyling() {
  return (
    <>
      <Styling />
    </>
  );
}

/* Scoper denne stylingen så den ikke overskriver styling i Meny/Dekorator */
export const AppStyling = styled.div`
  *:focus {
    ${theme.focus};
    border-radius: 0.2rem;
  }
`;
