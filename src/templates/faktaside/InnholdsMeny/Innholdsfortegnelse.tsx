import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { pxFromTop } from '../../../utils/domUtils';
import styled, { css } from 'styled-components/macro';
import useSmoothscrollOnClick from '../../../hooks/useSmoothscrollOnClick';
import { Group } from '../../../utils/richTextUtils/richTextTypes';
import { useInnholdsListe } from './useInnholdsListe';
import { LenkeUtenUnderstrek } from '../../../utils/common-styled-components';
import withErrorBoundary from '../../../components/withErrorBoundary';
import { useFaktasideContext } from '../FaktaSideContext';
import { loggMeny } from '../../../utils/logging';

const StyledLenke = styled(LenkeUtenUnderstrek)<{ erValgt: boolean }>`
  display: block;
  padding: 0.25rem 0;
  ${(props) =>
    props.erValgt &&
    css`
      color: black;
      &:focus {
        color: white;
      }
    `};
`;

const skjermBrøk = 1 / 4; // Brukes for å beregne hvilken gruppe bruker ser på for øyeblikket. Hvis den er 1/4 må en gruppe være over den øverste 1/4 av for å regnes som "currentGroup"

function useCurrentlyViewedGroup(items: Group[]): Group | undefined {
  const [current, setCurrent] = useState<Group | undefined>();

  const updateCurrentlyViewedMenuItem = useCallback(() => {
    const current = items
      .map((it) => ({ item: it, fromTop: pxFromTop(it.blockConfig?.id || 'N/A') }))
      .filter((it) => it.fromTop < window.innerHeight * skjermBrøk)
      .pop()?.item;
    setCurrent(current);
  }, [items]);

  useEffect(() => {
    window.addEventListener('scroll', updateCurrentlyViewedMenuItem, { passive: true });
    return () => window.removeEventListener('scroll', updateCurrentlyViewedMenuItem);
  }, [updateCurrentlyViewedMenuItem]);

  return current || items[0];
}

function MenuItem(props: { item: Group; current: boolean }) {
  const { SmoothScroll, activateSmoothScroll } = useSmoothscrollOnClick();

  return (
    <li key={props.item.blockConfig?.id} onClick={activateSmoothScroll}>
      <SmoothScroll />
      <StyledLenke
        erValgt={props.current}
        href={`#${props.item.blockConfig?.id}`}
        onClick={() => loggMeny('Hopp til overskrift')}
      >
        {props.item.title}
      </StyledLenke>
    </li>
  );
}

const StyledOl = styled.ol`
  padding: 0.5rem 1rem 1rem 2.5rem;
  border-right: 0.3rem solid #8884;
`;

function Innholdsfortegnelse() {
  const innholdsListe = useInnholdsListe();
  const faktasideContext = useFaktasideContext();

  if (!innholdsListe.length) {
    return null;
  }

  return <PureInnholdsfortegnelse title={faktasideContext.title || 'N/A'} innholdsListe={innholdsListe} />;
}

interface Props {
  title: string;
  innholdsListe: Group[];
}

export function PureInnholdsfortegnelse(props: Props) {
  const currentlyViewedGroup = useCurrentlyViewedGroup(props.innholdsListe);
  return (
    <StyledOl aria-label={`Innholdsfortegnelse ${props.title}`}>
      {props.innholdsListe.map((item) => (
        <MenuItem key={item.blockConfig?.id} item={item} current={currentlyViewedGroup === item} />
      ))}
    </StyledOl>
  );
}

export default withErrorBoundary(Innholdsfortegnelse, 'Innholdsfortegnelse');
