import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { pxFromTop } from '../../../utils/domUtils';
import styled, { css } from 'styled-components/macro';
import useSmoothscrollOnClick from '../../../hooks/useSmoothscrollOnClick';
import { Group } from '../../../utils/richTextUtils/richTextTypes';
import { useInnholdsListe } from './useInnholdsListe';
import { LenkeUtenUnderstrek } from '../../../utils/common-styled-components';
import { Link } from 'gatsby';

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

function useCurrentlyViewedGroup(items: Group[]): Group | undefined {
  const [current, setCurrent] = useState<Group | undefined>();

  const updateCurrentlyViewedMenuItem = useCallback(() => {
    const current = items
      .map((it) => ({ item: it, fromTop: pxFromTop(it.blockConfig?.id || 'N/A') }))
      .filter((it) => it.fromTop < window.innerHeight / 3)
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
      <StyledLenke as={Link} erValgt={props.current} to={`#${props.item.blockConfig?.id}`}>
        {props.item.title}
      </StyledLenke>
    </li>
  );
}

function InnholdsListe() {
  const innholdsListe = useInnholdsListe();
  const currentlyViewedItem = useCurrentlyViewedGroup(innholdsListe);

  return (
    <ol>
      {innholdsListe.map((item) => (
        <MenuItem key={item.blockConfig?.id} item={item} current={currentlyViewedItem === item} />
      ))}
    </ol>
  );
}

export default InnholdsListe;
