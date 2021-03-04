import React, { ReactElement, ReactNode } from "react";
import Head from "next/head";
import parse from "html-react-parser";
import { Components, Elements } from "@navikt/nav-dekoratoren-moduler/ssr";

export const parseDecoratorHTMLToReact = (elements: Elements): Components => {
  return {
    Styles: () => parse(elements.DECORATOR_STYLES) as ReactElement,
    Scripts: () => parse(elements.DECORATOR_SCRIPTS) as ReactElement,
    Header: () => parse(elements.DECORATOR_HEADER) as ReactElement,
    Footer: () => parse(elements.DECORATOR_FOOTER) as ReactElement,
  };
};

function Dekoratør(props: { elements: Elements; children: ReactNode }) {
  const Dekoratøren = parseDecoratorHTMLToReact(props.elements);

  return (
    <>
      <Head>
        <Dekoratøren.Styles />
        <Dekoratøren.Scripts />
      </Head>
      <Dekoratøren.Header />
      {props.children}
      <Dekoratøren.Footer />
    </>
  );
}

export default Dekoratør;
