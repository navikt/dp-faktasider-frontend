import React from "react";
import { render, within } from "../testUtils/customized-testing-library";
import IndexPage from "../pages";
import { mockMenuData } from "../sanity/groq/mockMenuData";

test("Index-side inneholder lenker til undersider med beskrivelse", () => {
  const result = render(
    <IndexPage
      forsideData={{
        title: "Arbeid",
        komIgangLenker: [],
        folketrygdensGrunnbellop: 1,
        beskrivelse: "",
        forsideNotifikasjoner: [],
      }}
      menuData={mockMenuData}
      locale={"no"}
    />
  );

  const lenkeListe = result.getAllByRole("list")[0];
  const lenker = within(lenkeListe).getAllByRole("link");

  expect(lenker).toHaveLength(mockFaktasiderMenuData.length);

  const lenkeData2 = mockFaktasiderMenuData[1] as InternalMenuLinkData;
  const lenkeNummer2 = result.getByLabelText(lenkeData2.tittel) as HTMLLinkElement;
  expect(lenkeNummer2.href).toContain(lenkeData2.path);
  within(lenkeNummer2).getByText(lenkeData2.beskrivelse);
});
