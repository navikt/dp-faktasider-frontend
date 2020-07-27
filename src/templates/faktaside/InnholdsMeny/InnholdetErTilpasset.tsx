import * as React from 'react';
import { useVisForContext } from '../../../components/BlockContent/VisFor/VisForContext';
import { UnmountClosed } from 'react-collapse';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import withErrorBoundary from '../../../components/withErrorBoundary';
import { isProduction } from '../../../utils/environment';

const Margin = styled.div`
  padding-bottom: ${theme.layoutMargin};
`;

function InnholdetErTilpasset() {
  const visForContext = useVisForContext();
  const valgt = visForContext.value.checked;

  if (isProduction()) {
    return null;
  }

  return (
    <UnmountClosed isOpened={valgt.length > 0}>
      <Margin>
        <AlertStripeInfo>
          Innholdet på denne siden er nå tilpasset deg som er {valgt.map((it) => it.toLowerCase()).join(' & ')}
        </AlertStripeInfo>
      </Margin>
    </UnmountClosed>
  );
}

export default withErrorBoundary(InnholdetErTilpasset, 'InnholdetErTilpasset');
