import * as React from 'react';
import withErrorBoundary from '../withErrorBoundary';
import { useEffect } from 'react';
import { loggError } from '../../utils/logging';
import { useGrunnbellop } from '../../utils/folketrygdensGrunnbeløp';

interface Props {
  children: string[];
}

const GtilNOKAnnotation = (props: Props) => {
  const G = props.children.join('');
  const notNumber = isNaN(Number(G));
  const { GtoNOK } = useGrunnbellop();

  useEffect(() => {
    notNumber && loggError(new Error('Kunne ikke konvertere belløp til NOK'), { grunnbellop: G });
  }, [notNumber, G]);

  if (notNumber) {
    return <>{G} (G)</>;
  }

  return <>{GtoNOK(parseFloat(G))}</>;
};

export default withErrorBoundary(GtilNOKAnnotation, 'GtilNOKAnnotation');
