import { RenderResult } from "@testing-library/react";
import { fireEvent, within } from "./customized-testing-library.test.utils";
import { TestId } from "../utils/test-ids";

export function toggleFilter(result: RenderResult, checkboxLabel: RegExp) {
  const tilpassInnhold = result.getByTestId(TestId.TILPASS_INNHOLD);
  const checkbox = within(tilpassInnhold).getByLabelText(checkboxLabel);
  fireEvent.click(checkbox);
}
