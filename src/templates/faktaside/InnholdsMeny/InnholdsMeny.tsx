import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { guid } from 'nav-frontend-js-utils';
import MobilmenyWrapper from './MobilmenyWrapper';
import { theme } from '../../../styles/theme';
import { pxFromTop } from '../../../utils/domUtils';
import { idFromString } from '../../../utils/routingUtils';
import useSmoothscrollOnClick from '../../../hooks/useSmoothscrollOnClick';
import { LenkeUtenUnderstrek } from '../../../utils/common-styled-components';
import { useDekoratorPopdownOffset } from './useDekoratorPopdownOffset';

const BigScreenLayout = styled.div<{ offsetTop: number }>`
  position: sticky;
  transition: top 0.2s;
  top: calc(${theme.layoutMargin} + ${(props) => props.offsetTop}px);
  top: ${theme.layoutMargin};
  background-color: white;
  border-radius: ${theme.borderRadius};
  padding: 1.5rem;
  width: 15rem;
  @media (${theme.media.smallScreen}) {
    display: none;
  }
`;

const StyledOl = styled.ol`
  max-height: 80vh;
  overflow-y: auto;
  li {
    margin: 1rem 0;
  }
`;

const StyledLenke = styled(LenkeUtenUnderstrek)<{ erValgt: boolean }>`
  ${(props) =>
    props.erValgt &&
    css`
      color: black !important;
    `};
`;

const StyledNav = styled.nav`
  @media print {
    display: none;
  }
`;

interface Props {
  menuItems: string[];
}

function useCurrentlyViewedMenuItem(items: string[]): string | undefined {
  const [current, setCurrent] = useState<string | undefined>();

  const updateCurrentlyViewedMenuItem = useCallback(() => {
    const current = items
      .map((it) => ({ item: it, fromTop: pxFromTop(idFromString(it)) }))
      .filter((it) => it.fromTop < window.innerHeight / 3)
      .pop()?.item;
    setCurrent(current);
  }, [items]);

  useEffect(() => {
    window.addEventListener('scroll', updateCurrentlyViewedMenuItem, { passive: true });
    return () => window.removeEventListener('scroll', updateCurrentlyViewedMenuItem);
  }, [updateCurrentlyViewedMenuItem]);

  return current;
}

function Meny(props: Props) {
  const currentlyViewedItem = useCurrentlyViewedMenuItem(props.menuItems);
  const { SmoothScroll, activateSmoothScroll } = useSmoothscrollOnClick();

  return (
    <>
      <SmoothScroll />
      <StyledOl>
        {props.menuItems.map((item) => (
          <li key={item} onClick={activateSmoothScroll}>
            <StyledLenke erValgt={currentlyViewedItem === item} href={`#${idFromString(item)}`}>
              {item}
            </StyledLenke>
          </li>
        ))}
      </StyledOl>
    </>
  );
}

function InnholdsMeny(props: Props) {
  const tittelId = useRef(guid());
  const offsetTop = useDekoratorPopdownOffset();

  return (
    <StyledNav aria-labelledby={tittelId.current}>
      <h2 id={tittelId.current} className="sr-only">
        Innhold
      </h2>
      <BigScreenLayout offsetTop={offsetTop}>
        <Meny {...props} />
      </BigScreenLayout>
      <MobilmenyWrapper offsetTop={offsetTop}>
        <Meny {...props} />
      </MobilmenyWrapper>
    </StyledNav>
  );
}

export default InnholdsMeny;
