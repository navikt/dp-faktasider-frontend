import * as React from 'react';
import { useRef } from 'react';
import styled from 'styled-components';
import { guid } from 'nav-frontend-js-utils';
import MobilmenyWrapper from './MobilmenyWrapper';
import { theme } from '../../../styles/theme';
import { useDekoratorPopdownOffset } from './useDekoratorPopdownOffset';
import InnholdsListe from './InnholdsListe';
import Filtrering from './Filtrering';
import ErrorBoundary from '../../../components/ErrorBoundary';

const margin = '1.5rem';

const BigScreenLayout = styled.div<{ offsetTop: number }>`
  position: sticky;
  top: calc(${margin} + ${(props) => props.offsetTop}px);
  max-height: calc(100vh - ${margin} * 2 - ${(props) => props.offsetTop}px);
  overflow-y: auto;
  padding: ${margin};
  transition: top 0.2s, max-height 0.2s;
  background-color: white;
  border-radius: ${theme.borderRadius};
  width: 15rem;
  @media (${theme.media.smallScreen}) {
    display: none;
  }
`;

const StyledNav = styled.nav`
  @media print {
    display: none;
  }
`;

function InnholdsMeny(props: React.ComponentProps<typeof InnholdsListe>) {
  const tittelId = useRef(guid());
  const offsetTop = useDekoratorPopdownOffset();

  if (!props.menuItems.length) {
    return null;
  }

  return (
    <ErrorBoundary boundaryName="Innholdsmeny">
      <StyledNav aria-labelledby={tittelId.current}>
        <h2 id={tittelId.current} className="sr-only">
          Innhold
        </h2>
        <BigScreenLayout offsetTop={offsetTop}>
          <InnholdsListe {...props} />
          <Filtrering />
        </BigScreenLayout>
        <MobilmenyWrapper offsetTop={offsetTop}>
          <InnholdsListe {...props} />
          <Filtrering />
        </MobilmenyWrapper>
      </StyledNav>
    </ErrorBoundary>
  );
}

export default InnholdsMeny;
