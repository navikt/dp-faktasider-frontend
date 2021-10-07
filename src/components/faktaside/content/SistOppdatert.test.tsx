import React from "react";
import { render } from "../../../testUtils/customized-testing-library.test.utils";
import { sistOppdatertTestdata } from "./SistOppdatert.testdata";
import TestFaktaside from "../../../testUtils/TestFaktaside";

describe("Sist oppdatert funker finfint med internasjonalisering", () => {
  test("På norsk", () => {
    const result = render(<TestFaktaside partialFaktaside={sistOppdatertTestdata.faktaside!!} />);

    result.getByText(/10. juli 2020 12:54/);
  });

  test("På engelsk", () => {
    const result = render(<TestFaktaside partialFaktaside={sistOppdatertTestdata.faktaside!!} />, undefined, "en");

    result.getByText(/July 10th 2020 12:54/);
  });
});
