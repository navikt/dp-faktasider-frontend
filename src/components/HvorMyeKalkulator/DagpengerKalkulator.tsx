import * as React from 'react';
import { useEffect, useState } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Collapse } from 'react-collapse';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { GrunnlagInput, InputWrapper, ResultatTable, KalkulatorStyle, toKR } from './felles';
import { H4 } from '../../utils/common-styled-components';
import { G, GtoNOK } from '../../utils/folketrygdensGrunnbeløp';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { useTranslation } from 'react-i18next';

function Resultat(props: { grunnlag?: number }) {
  const { t } = useTranslation('kalkulator');

  if (!props.grunnlag) {
    return null;
  }

  if (props.grunnlag < 0.75 * G) {
    return (
      <>
        <Normaltekst>{t('forLavtGrunnlag', { G: `0.75 G (${GtoNOK(0.75)} kroner)` })} </Normaltekst>
        <AlertStripeInfo>{t('sendSøknadLikvel')}</AlertStripeInfo>
      </>
    );
  }

  const under3G = Math.min(props.grunnlag, 3 * G);
  const mellom3og6G = Math.max(0, Math.min(props.grunnlag, 6 * G) - 3 * G);
  const over6G = Math.max(0, props.grunnlag - 6 * G);

  const resultatUnder3G = under3G * 0.8;
  const resultatMellom3og6G = mellom3og6G * 0.624;
  const totalt = resultatUnder3G + resultatMellom3og6G;

  return (
    <>
      <ResultatTable>
        <tbody className="typo-normal">
          <tr>
            <td>
              <i>Under 3 G</i>
            </td>
            <td>{toKR(under3G)} x 80 %</td>
            <td>{toKR(resultatUnder3G)}</td>
          </tr>
          <tr>
            <td>
              <i>{t('mellom', { over: 3, under: 6 })}</i>
            </td>
            <td>{toKR(mellom3og6G)} x 62.4 %</td>
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
            <td colSpan={2}>{t('tilsammen')}</td>
            <td>{toKR(totalt)}</td>
          </tr>
          <tr>
            <td colSpan={2}>{t('ukesats')}</td>
            <td> {toKR(totalt / 52)}</td>
          </tr>
        </tbody>
      </ResultatTable>
      <AlertStripeInfo>{t('kunveiledende')}</AlertStripeInfo>
    </>
  );
}

function DagpengerKalkulator() {
  const [harLoggetBruk, setHarLoggetBruk] = useState(false);
  const [grunnlag, setGrunnlag] = useState<undefined | number>();
  const debouncedGrunnlag = useDebouncedValue(grunnlag, 300);
  const { t } = useTranslation('kalkulator');

  useEffect(() => {
    if (!harLoggetBruk && grunnlag) {
      setHarLoggetBruk(true);
      console.log('Sett opp logging til amplitude.');
    }
  }, [grunnlag, harLoggetBruk]);

  return (
    <KalkulatorStyle>
      <Collapse isOpened={true}>
        <H4>{t('heading')}</H4>
        <InputWrapper>
          <GrunnlagInput
            label={t('label')}
            type="number"
            value={grunnlag || ''}
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
