import React from "react";
import SistOppdatert from "./SistOppdatert";
import { getPubliseringsTidspunkt } from "../../../gatsby-utils/getPubliseringstidspunkt";
import { render } from "../../../testUtils/customized-testing-library";
import { sistOppdatertTestdata } from "./SistOppdatert.testdata";

describe("Sist oppdatert funker finfint med internasjonalisering", () => {
  test("På norsk", () => {
    const publiseringsTidspunkt = getPubliseringsTidspunkt(sistOppdatertTestdata);
    const result = render(<SistOppdatert publiseringsTidspunkt={publiseringsTidspunkt} />);

    result.getByText(/10. juli 2020 12:54/);
  });

  test("På engelsk", () => {
    const publiseringsTidspunkt = getPubliseringsTidspunkt(sistOppdatertTestdata);
    const result = render(<SistOppdatert publiseringsTidspunkt={publiseringsTidspunkt} />, undefined, "en");

    result.getByText(/July 10th 2020 12:54/);
  });
});
