import React from "react";
import { groupMarkupTestData } from "./GroupMarkup.testdata";
import { SanityContent } from "../../sanity-content/SanityContent";
import { render, within } from "../../../testUtils/customized-testing-library.test.utils";
import parseRichText from "../../../utils/richTextUtils/parser/parseRichText";

describe("group-markup", () => {
  test("h2-gruppe får overskrift med ankerlenke og anchor", () => {
    const result = render(<SanityContent blocks={parseRichText(groupMarkupTestData)} />);
    const bolk = result.getByLabelText(/Overskrift 1/i);
    const lenke = within(bolk).getByRole("link");

    expect(lenke.getAttribute("href")).toContain("#overskrift-1");
    expect(bolk.querySelector('[id="overskrift-1"]')).toBeTruthy();
  });

  test("h2-gruppe får overskrift og innhold", () => {
    const result = render(<SanityContent blocks={parseRichText(groupMarkupTestData)} />);

    result.getByLabelText(/Overskrift 1/i);
    result.getByText(/Innhold 1/i);
  });
});
