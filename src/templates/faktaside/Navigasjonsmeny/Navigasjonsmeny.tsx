import * as React from 'react';
import styled from 'styled-components';
import withErrorBoundary from '../../../components/withErrorBoundary';
import { useDekoratorPopdownOffset } from './useDekoratorPopdownOffset';
import SideListe from './SideListe';
import MobilmenyWrapper from './MobilmenyWrapper';
import { theme } from '../../../styles/theme';
import { useRef } from 'react';
import { guid } from 'nav-frontend-js-utils';

type NavProps = { offsetTop: number };

const DesktopNav = styled.nav.attrs((props: NavProps) => ({ style: { top: `${props.offsetTop}px` } }))<NavProps>`
  @media (${theme.media.smallScreen}) {
    display: none;
  }
  border-top: ${theme.border.banner};
  background-color: white;
  position: sticky;
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

interface Props {
  className?: string;
}

function Navigasjonsmeny(props: Props) {
  const offsetTop = useDekoratorPopdownOffset();
  const mobileTitleId = useRef(guid()).current;
  const desktopTitleId = useRef(guid()).current;

  return (
    <>
      <DesktopNav offsetTop={offsetTop} className={props.className} aria-labelledby={desktopTitleId}>
        <h2 id={desktopTitleId} className="sr-only">
          Sideoversikt
        </h2>
        <SideListe />
      </DesktopNav>
      <MobileNav className={props.className} aria-labelledby={mobileTitleId}>
        <h2 id={mobileTitleId} className="sr-only">
          Sideoversikt
        </h2>
        <MobilmenyWrapper offsetTop={offsetTop}>
          <SideListe />
        </MobilmenyWrapper>
      </MobileNav>
    </>
  );
}

export default withErrorBoundary(Navigasjonsmeny, 'Navigasjonsmeny');
