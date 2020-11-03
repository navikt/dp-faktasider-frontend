import * as React from "react";
import { useEffect, useState } from "react";
import { Collapse } from "react-collapse";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import { GrunnlagInput, InputWrapper, KalkulatorStyle, ResultatTable, toKR } from "./felles";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { H4 } from "../../utils/common-styled-components";
import { loggKalkulatorbruk } from "../../utils/logging";
import { useGrunnbellop } from "../../utils/folketrygdensGrunnbeløp";

function Resultat(props: { grunnlag?: number }) {
  const { G } = useGrunnbellop();
  if (!props.grunnlag) {
    return null;
  }

  const under15G = Math.min(props.grunnlag, 1.5 * G);
  const mellom15og6G = Math.max(0, Math.min(props.grunnlag, 6 * G) - 1.5 * G);
  const over6G = Math.max(0, props.grunnlag - 6 * G);

  const resultatUnder15G = under15G;
  const resultatMellom3og6G = mellom15og6G * 0.624;
  const totalt = resultatUnder15G + resultatMellom3og6G;

  return (
    <>
      <ResultatTable>
        <tbody className="typo-normal">
          <tr>
            <td>
              <i>Under 1.5 G</i>
            </td>
            <td>{toKR(under15G)} x 100 %</td>
            <td>{toKR(resultatUnder15G)}</td>
          </tr>
          <tr>
            <td>
              <i>Mellom 1.5 og 6 G</i>
            </td>
            <td>{toKR(mellom15og6G)} x 62.4 %</td>
            <td> {toKR(resultatMellom3og6G)}</td>
          </tr>
          {over6G > 0 && (
            <tr>
              <td>
                <i>Over 6 G</i>
              </td>
              <td>{toKR(over6G)} x 0 %</td>
              <td>{toKR(0)}</td>
            </tr>
          )}
          <tr>
            <td colSpan={2}>Til saman</td>
            <td>{toKR(totalt)}</td>
          </tr>
          <tr>
            <td colSpan={2}>Dagpengar per veke (før skatt) </td>
            <td> {toKR(totalt / 52)}</td>
          </tr>
        </tbody>
      </ResultatTable>
      <AlertStripeInfo>Tala viser omtrent kor mykje du kan ha rett til, ut frå inntekta ovanfor.</AlertStripeInfo>
    </>
  );
}

function DagpengerKalkulatorLRling() {
  const [harLoggetBruk, setHarLoggetBruk] = useState(false);
  const [grunnlag, setGrunnlag] = useState<undefined | number>();
  const debouncedGrunnlag = useDebouncedValue(grunnlag, 300);

  useEffect(() => {
    if (!harLoggetBruk && grunnlag) {
      loggKalkulatorbruk("Uinnlogget lærling");
      setHarLoggetBruk(true);
    }
  }, [grunnlag, harLoggetBruk]);

  return (
    <KalkulatorStyle>
      <Collapse isOpened={true}>
        <H4>Forstå reknestykket</H4>
        <InputWrapper>
          <GrunnlagInput
            label="Skriv ei årsinntekt:"
            type="number"
            value={grunnlag || ""}
            onChange={(e) => setGrunnlag(Math.max(0, +e.target.value) || undefined)}
            placeholder="350 000"
          />
        </InputWrapper>
        <Resultat grunnlag={debouncedGrunnlag} />
      </Collapse>
    </KalkulatorStyle>
  );
}

export default DagpengerKalkulatorLRling;
