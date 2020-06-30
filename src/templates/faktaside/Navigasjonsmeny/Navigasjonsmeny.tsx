import * as React from 'react';
import styled from 'styled-components';
import withErrorBoundary from '../../../components/withErrorBoundary';
import { useDekoratorPopdownOffset } from './useDekoratorPopdownOffset';
import SideListe from './SideListe';
import MobilmenyWrapper from './MobilmenyWrapper';
import { theme } from '../../../styles/theme';

const DesktopNav = styled.nav<{ offsetTop: number }>`
  @media (${theme.media.smallScreen}) {
    display: none;
  }
  position: sticky;
  top: calc(${(props) => props.offsetTop}px);
  max-height: calc(100vh - ${(props) => props.offsetTop}px);
  overflow-y: auto;
  transition: top 0.2s, max-height 0.2s;
  max-width: 16rem;
`;

const MobileNav = styled.nav`
  @media not all and (${theme.media.smallScreen}) {
    display: none;
  }
`;

function Navigasjonsmeny() {
  const offsetTop = useDekoratorPopdownOffset();
  const meny = <SideListe />;

  return (
    <>
      <DesktopNav offsetTop={offsetTop}>{meny}</DesktopNav>
      <MobileNav>
        <MobilmenyWrapper offsetTop={offsetTop}>{meny}</MobilmenyWrapper>
      </MobileNav>
    </>
  );
}

export default withErrorBoundary(Navigasjonsmeny, 'Navigasjonsmeny');
