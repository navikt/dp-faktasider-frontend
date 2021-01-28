import React from "react";
import { render, within } from "../testUtils/customized-testing-library";
import NotFoundPage from "../pages/404";
import { mockMenuData } from "../sanity/groq/menu/mockMenuData";

describe("404-side", () => {
  test("inneholder info om at denne siden ikke finnes", () => {
    const result = render(<NotFoundPage menuData={mockMenuData} />);
    result.getByText("Denne siden finnes ikke");
  });

  test("inneholder en liste med lenker til alle sider i appen", () => {
    const result = render(<NotFoundPage menuData={mockMenuData} />);
    const liste = result.getByRole("list");
    const lenker = within(liste).getAllByRole("link");

    expect(lenker).toHaveLength(mockMenuData.sider.length + mockMenuData.lenker.length);
  });
});
