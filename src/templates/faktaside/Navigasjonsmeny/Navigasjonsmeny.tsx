import * as React from 'react';
import styled from 'styled-components';
import withErrorBoundary from '../../../components/withErrorBoundary';
import { useDekoratorPopdownOffset } from './useDekoratorPopdownOffset';
import SideListe from './SideListe';
import MobilmenyWrapper from './MobilmenyWrapper';
import { theme } from '../../../styles/theme';
import useProjectData from '../../../utils/faktasiderSummary/useProjectData';
import { Undertittel } from 'nav-frontend-typografi';
import useUniqueId from '../../../utils/useUniqueId';

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

const HeaderStyle = styled(Undertittel)`
  padding: 2rem;
  opacity: 0.6;
  text-transform: uppercase;
  text-align: center;
  pointer-events: none;
`;

function Header(props: { id: string; title: string }) {
  return (
    <HeaderStyle id={props.id}>
      <span className="sr-only">Sideoversikt</span>
      {props.title}
    </HeaderStyle>
  );
}

interface Props {
  className?: string;
}

function Navigasjonsmeny(props: Props) {
  const offsetTop = useDekoratorPopdownOffset();
  const mobileTitleId = useUniqueId('mobile-menu');
  const desktopTitleId = useUniqueId('desktop-menu');
  const projectData = useProjectData();

  return (
    <>
      <DesktopNav offsetTop={offsetTop} className={props.className} aria-labelledby={desktopTitleId}>
        <Header title={projectData.title} id={desktopTitleId} />
        <SideListe />
      </DesktopNav>
      <MobileNav className={props.className} aria-labelledby={mobileTitleId}>
        <MobilmenyWrapper offsetTop={offsetTop}>
          <Header title={projectData.title} id={mobileTitleId} />
          <SideListe />
        </MobilmenyWrapper>
      </MobileNav>
    </>
  );
}

export default withErrorBoundary(Navigasjonsmeny, 'Navigasjonsmeny');
