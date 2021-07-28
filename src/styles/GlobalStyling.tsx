import React from "react";
import styled, { createGlobalStyle } from "styled-components/macro";
import { theme } from "./theme";

const Styling = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  a {
    word-break: break-word;
  }

  html {
    font-size: 112.5% !important;
    @media (min-width: 1400px) {
      font-size: 125% !important;
    }
    font-family: 'Source Sans Pro', sans-serif;
    
    &:focus-within {
      scroll-behavior: smooth;
    }
  }

  body {
    background-color: ${theme.colors.bakgrunn};
    font-size: 1rem; // motvikrer ny styling fra designsystemet som gjør designet vår uproporsjonalt
  }

  .ReactCollapse--collapse {
    transition: height 0.3s;
  }

  .decorator-wrapper .sticky-container {
    position: static !important;
  }

  // Fiks for at design i appen skal forbli proporsjonalt mens vi migrerer til nye @navikt/ds-react fra designsystemet https://navikt.github.io/Designsystemet/?path=/story/ds-react-typography-intro--page
  :root {
    --navds-font-size-title-2xl: 2.2222222222222223rem;
    --navds-font-size-title-xl: 1.7777777777777777rem;
    --navds-font-size-title-l: 1.5555555555555556rem;
    --navds-font-size-title-m: 1.3333333333333333rem;
    --navds-font-size-title-s: 1.1111111111111112rem;
    --navds-font-size-xl: 1.1111111111111112rem;
    --navds-font-size-l: 1rem;
    --navds-font-size-m: 0.8888888888888888rem;
    --navds-font-size-s: 0.7777777777777778rem;
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
