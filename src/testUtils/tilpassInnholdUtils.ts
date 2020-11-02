import { RenderResult } from "@testing-library/react";
import { fireEvent, within } from "./customized-testing-library";

export function toggleFilter(result: RenderResult, checkboxLabel: RegExp) {
  const tilpassInnhold = result.getByLabelText(/Tilpass/);
  const checkbox = within(tilpassInnhold).getByLabelText(checkboxLabel);
  fireEvent.click(checkbox);
}
