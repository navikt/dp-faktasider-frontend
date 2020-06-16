import * as React from 'react';
import styled from 'styled-components';
import withErrorBoundary from '../../../components/withErrorBoundary';
import { useDekoratorPopdownOffset } from './useDekoratorPopdownOffset';
import SideListe from './SideListe';
import MobilmenyWrapper from '../InnholdsMeny/MobilmenyWrapper';
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
  background-color: white;
  max-width: 15rem;
`;

const MobileNav = styled.nav`
  @media not all and (${theme.media.smallScreen}) {
    display: none;
  }
`;

function Navigasjonsmeny(props: React.ComponentProps<typeof SideListe>) {
  const offsetTop = useDekoratorPopdownOffset();
  const meny = <SideListe {...props} />;

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
