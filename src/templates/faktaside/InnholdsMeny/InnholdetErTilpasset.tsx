import * as React from 'react';
import { useVisForContext } from '../../../components/BlockContent/VisFor/VisForContext';
import { UnmountClosed } from 'react-collapse';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import withErrorBoundary from '../../../components/withErrorBoundary';
import { RefObject, useEffect, useState } from 'react';
import { getFiltreringsvalgLabel } from '../TilpassInnhold/getFiltreringsLabel';
import Utkast from '../../../components/BlockContent/utkast/Utkast';

const Margin = styled.div`
  padding-bottom: ${theme.layoutMargin};
`;

interface Props {
  contentRef: RefObject<HTMLDivElement>;
}

function InnholdetErTilpasset(props: Props) {
  const visForContext = useVisForContext();
  const valgt = visForContext.value.checked;
  const [fullWordCount, setFullWordCount] = useState<number | undefined>();
  const [wordCountAfterFilter, setWordCountAfterFilter] = useState<number | undefined>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!valgt.length) {
        setFullWordCount(getWordCount(props.contentRef));
      } else {
        setWordCountAfterFilter(getWordCount(props.contentRef));
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [valgt, props.contentRef]);

  const removedWords = fullWordCount && wordCountAfterFilter ? fullWordCount - wordCountAfterFilter : undefined;

  return (
    // TODO løsningen for å vise hvor mange ord som er fjernet bør nok skrives om. Nå trenger den bla en timeout for å vente på at collapse-animasjoner skal bli ferdige.
    <UnmountClosed isOpened={valgt.length > 0}>
      <Utkast>
        <Margin>
          <AlertStripeInfo>
            Vi har fjernet {removedWords} ord for å tilpasse siden til deg som er{' '}
            {valgt.map((it) => getFiltreringsvalgLabel(it).toLowerCase()).join(' & ')}.
          </AlertStripeInfo>
        </Margin>
      </Utkast>
    </UnmountClosed>
  );
}

function getWordCount(ref: RefObject<HTMLDivElement>) {
  return ref.current?.innerText.match(/\s+/g)?.length;
}

export default withErrorBoundary(InnholdetErTilpasset, 'InnholdetErTilpasset');
