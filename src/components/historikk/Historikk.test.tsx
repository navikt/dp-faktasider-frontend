import { render, screen, within } from "../../testUtils/customized-testing-library.test.utils";
import Historikk from "./Historikk";
import {
  historikkCustomComponentTestdata,
  historikkDeltTekstTestdata,
  historikkGBelløpTestdata,
} from "./historikk.testdata";

describe("Historikk", () => {
  it("ved delte teskter vises en lenke til historiskk for den delte teksten", () => {
    render(<Historikk {...historikkDeltTekstTestdata} />);

    const rekonstrukjon = screen.getByLabelText(/Rekonstruksjon/i);

    within(rekonstrukjon).getByRole("link", { name: /Se versjonshistorikk for den delte teksten/i });
  });

  it("G-beløp kan ikke konverteres til kroner siden vi ikke vet hva grunnbelløpet var på gjeldende tidspunkt", () => {
    render(<Historikk {...historikkGBelløpTestdata} />);

    const rekonstrukjon = screen.getByLabelText(/Rekonstruksjon/i);

    within(rekonstrukjon).getByText(/G-beløpet her var oversatt/);
    within(rekonstrukjon).getByText(/2 G/);
  });

  it("ved custom components vises info om at dette ikke gjennspeiler hvordan det faktisk så ut på gjeldende tidspunkt", () => {
    render(<Historikk {...historikkCustomComponentTestdata} />);

    const rekonstrukjon = screen.getByLabelText(/Rekonstruksjon/i);

    within(rekonstrukjon).getByText(/spesialkomponent ved navn/);
  });
});
