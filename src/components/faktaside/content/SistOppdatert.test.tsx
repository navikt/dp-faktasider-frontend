import React from "react";
import { render } from "../../../testUtils/customized-testing-library.test.utils";
import { sistOppdatertTestdata } from "./SistOppdatert.testdata";
import TestFaktaside from "../../../testUtils/TestFaktaside";
import { IFaktaside } from "../../../sanity/groq/faktaside/faktasideQuery";

describe("Sist oppdatert funker finfint med internasjonalisering", () => {
  test("På norsk", () => {
    const result = render(<TestFaktaside partialFaktaside={sistOppdatertTestdata.faktaside as Partial<IFaktaside>} />);

    result.findByText(/10. juli 2020 12:54/);
  });

  test("På engelsk", () => {
    const result = render(
      <TestFaktaside partialFaktaside={sistOppdatertTestdata.faktaside as Partial<IFaktaside>} />,
      undefined,
      "en"
    );

    result.findByText(/July 10th 2020 12:54/);
  });
});
