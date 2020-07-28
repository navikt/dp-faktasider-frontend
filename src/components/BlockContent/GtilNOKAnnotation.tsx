import * as React from 'react';
import withErrorBoundary from '../withErrorBoundary';
import { useEffect } from 'react';
import { GtoNOK } from '../../utils/folketrygdensGrunnbeløp';
import { loggError } from '../../utils/logging';

interface Props {
  children: string[];
}

const GtilNOKAnnotation = (props: Props) => {
  const G = props.children.join('');
  const notNumber = isNaN(Number(G));

  useEffect(() => {
    notNumber && loggError(new Error('Kunne ikke konvertere belløp til NOK'), { grunnbellop: G });
  }, [notNumber, G]);

  if (notNumber) {
    return <>{G} (G)</>;
  }

  return <>{GtoNOK(parseFloat(G))}</>;
};

export default withErrorBoundary(GtilNOKAnnotation, 'GtilNOKAnnotation');
