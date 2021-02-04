import React from "react";
import { render, within } from "../testUtils/customized-testing-library";
import ForsideWrapper from "../pages";
import { mockMenuData } from "../sanity/groq/menu/mockMenuData";
import { translated } from "../testUtils/createSanityBlock";

test("Index-side inneholder lenker til undersider med beskrivelse", () => {
  const result = render(
    <ForsideWrapper
      forsideData={{
        title: translated("Arbeid"),
      }}
      menuData={mockMenuData}
    />
  );

  const lenkeListe = result.getAllByRole("list")[0];
  const lenker = within(lenkeListe).getAllByRole("link");

  expect(lenker).toHaveLength(mockMenuData.lenker!.length + mockMenuData.sider!.length);

  const lenkeData2 = mockMenuData.sider![1];
  const lenkeNummer2 = result.getByLabelText(lenkeData2.title!.no!) as HTMLLinkElement;
  expect(lenkeNummer2.href).toContain(lenkeData2.slug);
  within(lenkeNummer2).getByText(lenkeData2.beskrivelse!.no!);
});
