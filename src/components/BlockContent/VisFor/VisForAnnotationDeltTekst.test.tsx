import React from "react";
import TestFaktaside from "../../../testUtils/TestFaktaside";
import { visForAnnotationDeltTekstTestData } from "./visForAnnotationDeltTekstTestData";
import { render, within } from "../../../testUtils/customized-testing-library";

describe("visFor i en delt tekst", () => {
  const { firstPageId, secondPageId, data } = visForAnnotationDeltTekstTestData;

  test("innhold merket for å kun vises på side 1 vises kun på side 1", () => {
    const result = render(<TestFaktaside partialContext={{ innhold: data, id: firstPageId }} />);

    result.getByText("Vis for side nummer 1");
    expect(result.queryByText("Vis for side nummer 2")).toBeFalsy();

    const bulletPoints = within(result.getByLabelText("Overskrift fra delt tekst")).getAllByRole("listitem");
    expect(bulletPoints).toHaveLength(1);
  });

  test("innhold merket for å kun vises på side 2 vises kun på side 2", () => {
    const result = render(<TestFaktaside partialContext={{ innhold: data, id: secondPageId }} />);

    result.getByText("Vis for side nummer 2");
    expect(result.queryByText("Vis for side nummer 1")).toBeFalsy();

    const bulletPoints = within(result.getByLabelText("Overskrift fra delt tekst")).queryAllByRole("listitem");
    expect(bulletPoints).toHaveLength(0);
  });
});
