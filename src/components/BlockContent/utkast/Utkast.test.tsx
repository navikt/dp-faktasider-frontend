import React from "react";
import parseRichText from "../../../utils/richTextUtils/parser/parseRichText";
import BlockContent from "../BlockContent";
import { render, within } from "../../../testUtils/customized-testing-library.test.utils";
import { utkastTestData } from "./Utkast.testdata";
import TestFaktaside from "../../../testUtils/TestFaktaside";

describe("utkast", () => {
  const parsedInnhold = parseRichText(utkastTestData);

  test("dersom hele teksten i et bulletpoint er merket som utkast skal bulletpointet ikke vises", () => {
    const result = render(<BlockContent blocks={parsedInnhold} />);
    const listepunkter = result.getAllByRole("listitem");
    expect(listepunkter).toHaveLength(1);
  });

  test("Dersom tekst er merket med utkast skal den ikke vises", () => {
    const result = render(<BlockContent blocks={parsedInnhold} />);
    expect(result.queryByText("Frittstående utkast")).toBeNull();
  });

  test("tekst som ikke er merket med utkast skal vises", () => {
    const result = render(<BlockContent blocks={parsedInnhold} />);
    result.getByText("Frittstående tekst");
  });

  test("Dersom en hel overskrift er merket med utkast skal hele bolken skjules", () => {
    const result = render(<BlockContent blocks={parsedInnhold} />);
    expect(result.queryByText("Overskrift utkast")).toBeNull();
    expect(result.queryByText("Påfølgende innhold")).toBeNull();
  });

  test("Dersom en hel overskrift er merket med utkast skal ikke bolken vises i meny", () => {
    const result = render(<TestFaktaside innhold={utkastTestData} />);

    const desktopInnholdsfortegnelse = result.getAllByLabelText(/innholdsfortegnelse/i)[0];

    expect(within(desktopInnholdsfortegnelse).queryByText("Overskrift utkast")).toBeNull();
    within(desktopInnholdsfortegnelse).getByText("Overskrift vanlig");
  });
});
