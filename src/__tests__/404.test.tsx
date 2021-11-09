import React from "react";
import { render, within } from "../testUtils/customized-testing-library.test.utils";
import NotFoundPage from "../pages/404";
import { mockMenuData } from "../sanity/groq/menu/mockMenuData";
import { MenuQueryData } from "../sanity/groq/menu/menuQuery";

describe("404-side", () => {
  test("inneholder info om at denne siden ikke finnes", () => {
    const result = render(
      <NotFoundPage menuData={mockMenuData as MenuQueryData} data={{ domeneTittel: "Test.com" }} />
    );
    result.getByText("Fant ikke siden");
  });

  test("inneholder en liste med lenker til alle sider i appen", () => {
    const result = render(
      <NotFoundPage menuData={mockMenuData as MenuQueryData} data={{ domeneTittel: "Test.com" }} />
    );
    const liste = result.getByRole("list");
    const lenker = within(liste).getAllByRole("link");

    expect(lenker).toHaveLength(mockMenuData.sider.length + mockMenuData.lenker.length);
  });
});
