import React from "react";
import TestFaktaside from "../../../testUtils/TestFaktaside";
import { render, within } from "../../../testUtils/customized-testing-library.test";
import Historikk from "../../historikk/Historikk";
import { visPaaSideTestData } from "./VisPaaSide.testdata";
import { historikkVisPaaTestdata } from "../../historikk/historikk.testdata";

describe("innhold i delt tekst merket med visPaa", () => {
  test("skal vises for alle sider dersom innholdet er merket med et tomt visPaa-array", () => {
    const page = render(<TestFaktaside partialFaktaside={visPaaSideTestData} />);

    page.getByLabelText("Overskrift som skal vises overalt");
  });

  test("skal vises på sider den er merket for å vises på", () => {
    const page = render(<TestFaktaside partialFaktaside={visPaaSideTestData} />);

    const bolk = page.getByLabelText("Vis på denne siden");
    within(bolk).getByText("Innhold som skal vises");
  });

  test("skal vises i menyen på sider den er merket for å vises på", () => {
    const page = render(<TestFaktaside partialFaktaside={visPaaSideTestData} />);

    const meny = page.getAllByLabelText(/innholdsfortegnelse/i)[0];
    within(meny).getByText("Vis på denne siden");
  });

  test("skal ikke vises på sider den ikke er merket for å vises på", () => {
    const page = render(<TestFaktaside partialFaktaside={visPaaSideTestData} />);

    expect(page.queryByLabelText("Ikke vis på denne siden")).toBeFalsy();
  });

  test("skal ikke vises i menyen på sider den ikke er merket for å vises på", () => {
    const page = render(<TestFaktaside partialFaktaside={visPaaSideTestData} />);

    const meny = page.getAllByLabelText(/innholdsfortegnelse/i)[0];

    expect(within(meny).queryByText("Ikke vis på denne siden")).toBeNull();
  });

  test("bulletpoints fjernes helt om de ikke skal vises på siden", () => {
    const result = render(<TestFaktaside partialFaktaside={visPaaSideTestData} />);

    result.getByText("Bullet som skal vises");
    expect(result.queryByText("Bullet som ikke skal vises")).toBeFalsy();

    const bulletPoints = within(result.getByLabelText("Bolk med bullets")).getAllByRole("listitem");
    expect(bulletPoints).toHaveLength(1);
  });

  test("skal også fungere for historikk", () => {
    const result = render(<Historikk {...historikkVisPaaTestdata} />);

    const rekonstruksjon = result.getByLabelText(/rekonstruksjon/i);
    within(rekonstruksjon).getByText(/Dette skal kun vises på en bestemt side/i);
  });
});
