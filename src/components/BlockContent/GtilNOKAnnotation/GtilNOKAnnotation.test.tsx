import { render, screen } from "../../../testUtils/customized-testing-library";
import TestFaktaside from "../../../testUtils/TestFaktaside";
import { GtilNOKAnnotationTestdata } from "./GtilNOKAnnotation.testdata";

test("konverterer grunnbeløp til NOK", () => {
  render(<TestFaktaside innhold={GtilNOKAnnotationTestdata} partialOppsett={{ folketrygdensGrunnbellop: 10 }} />);
  screen.getByText("20");
});
