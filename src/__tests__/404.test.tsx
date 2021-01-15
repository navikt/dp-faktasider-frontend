import React from "react";
import { render, within } from "../testUtils/customized-testing-library";
import NotFoundPage from "../pages/arbeid/404";
import { mockFaktasiderMenuData } from "../hooks/graphQl/mockFaktasiderMenuData";

describe("404-side", () => {
  test("inneholder info om at denne siden ikke finnes", () => {
    const result = render(<NotFoundPage menuData={mockFaktasiderMenuData} />);
    result.getByText("Denne siden finnes ikke");
  });

  test("inneholder en liste med lenker til alle sider i appen", () => {
    const result = render(<NotFoundPage menuData={mockFaktasiderMenuData} />);
    const liste = result.getByRole("list");
    const lenker = within(liste).getAllByRole("link");

    expect(lenker).toHaveLength(mockFaktasiderMenuData.length);
  });
});
