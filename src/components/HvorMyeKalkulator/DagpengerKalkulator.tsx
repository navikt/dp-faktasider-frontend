import React, { useEffect, useState } from "react";
import { Collapse } from "react-collapse";
import { Alert, BodyShort } from "@navikt/ds-react";
import { GrunnlagInput, InputWrapper, KalkulatorStyle, ResultatTable, toKR } from "./felles";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { useTranslation } from "react-i18next";
import { loggKalkulatorbruk } from "../../utils/logging";
import { useGrunnbellop } from "../../utils/folketrygdensGrunnbeløp";

function Resultat(props: { grunnlag?: number }) {
  const { t } = useTranslation("kalkulator");
  const { G, GtoNOK } = useGrunnbellop();

  if (!props.grunnlag) {
    return null;
  }

  if (props.grunnlag < 0.75 * G) {
    return (
      <>
        <BodyShort>{t("forLavtGrunnlag", { G: `0.75 G (${GtoNOK(0.75)} kroner)` })} </BodyShort>
        <Alert variant="info">{t("sendSøknadLikvel")}</Alert>
      </>
    );
  }

  const minimumsinntektIOvergang = props.grunnlag >= 0.75 * G && props.grunnlag < 1.5 * G;

  //const under3G = Math.min(props.grunnlag, 3 * G);
  const mellom0og6g = Math.max(0, Math.min(props.grunnlag, 6 * G));
  const over6G = Math.max(0, props.grunnlag - 6 * G);

  //const resultatUnder3G = under3G * 0.624;
  const resultatMellom0og6G = mellom0og6g * 0.624;
  const totalt = resultatMellom0og6G;

  return (
    <>
      <ResultatTable>
        <tbody>
          <tr>
            <td>
              <i>{t("mellom", { over: 0, under: 6 })}</i>
            </td>
            <td>{toKR(mellom0og6g)} x 62.4 %</td>
            <td> {toKR(resultatMellom0og6G)}</td>
          </tr>
          {over6G > 0 && (
            <tr>
              <td>
                <i>Inntekt over 6 G</i>
              </td>
              <td>{toKR(over6G)} x 0 %</td>
              <td>{toKR(0)}</td>
            </tr>
          )}
          <tr>
            <td colSpan={2}>{t("tilsammen")}</td>
            <td>{toKR(totalt)}</td>
          </tr>
          <tr>
            <td colSpan={2}>{t("ukesats")}</td>
            <td> {toKR(totalt / 52)}</td>
          </tr>
        </tbody>
      </ResultatTable>
      {minimumsinntektIOvergang && (
        <Alert variant="info">
          {t("minimumsinntektKunIOvergang", { G: `1.5 G (${GtoNOK(1.5)} kroner)` })}
          <br />
          {t("nyereglerfra")}
          <br />
          {t("kunveiledende")}
        </Alert>
      )}
      {!minimumsinntektIOvergang && (
        <Alert variant="info">
          {t("nyereglerfra")}
          <br />
          {t("kunveiledende")}
        </Alert>
      )}
    </>
  );
}

function DagpengerKalkulator() {
  const [harLoggetBruk, setHarLoggetBruk] = useState(false);
  const [grunnlag, setGrunnlag] = useState<undefined | number>();
  const debouncedGrunnlag = useDebouncedValue(grunnlag, 300);
  const { t } = useTranslation("kalkulator");

  useEffect(() => {
    if (!harLoggetBruk && grunnlag) {
      loggKalkulatorbruk("Uinnlogget vanlig");
      setHarLoggetBruk(true);
    }
  }, [grunnlag, harLoggetBruk]);

  return (
    <KalkulatorStyle>
      <Collapse isOpened={true}>
        <InputWrapper>
          <GrunnlagInput
            label={t("label")}
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

export default DagpengerKalkulator;
