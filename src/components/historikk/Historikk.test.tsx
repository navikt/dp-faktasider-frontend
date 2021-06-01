import { render, screen, within } from "../../testUtils/customized-testing-library";
import Historikk from "./Historikk";
import { historikkDeltTekstTestdata, historikkGBelløpTestdata } from "./historikk.testdata";

describe("Historikk", () => {
  it("ved delte teskter vises en lenke til historiskk for den delte teksten", () => {
    render(<Historikk {...historikkDeltTekstTestdata} />);

    const rekonstrukjon = screen.getByLabelText(/Rekonstruksjon/i);

    within(rekonstrukjon).getByRole("link", { name: /versjonshistorikk av denne teksten/i });
  });

  it("G-beløp kan ikke konverteres til kroner siden vi ikke vet hva grunnbelløpet var på gjeldende tidspunkt", () => {
    render(<Historikk {...historikkGBelløpTestdata} />);

    const rekonstrukjon = screen.getByLabelText(/Rekonstruksjon/i);

    within(rekonstrukjon).getByText(/G-beløp her var oversatt til NOK/);
    within(rekonstrukjon).getByText(/2 G/);
  });

  it.skip("ved custom components vises info om at dette ikke gjennspeiler hvordan det faktisk så ut på gjeldende tidspunkt", () => {
    // TODO whaat whaaaat
  });
});
