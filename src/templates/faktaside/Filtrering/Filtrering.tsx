import * as React from 'react';
import { useVisForContext } from '../../../components/BlockContent/VisFor/VisForContext';
import styled from 'styled-components/macro';
import { Checkbox } from 'nav-frontend-skjema';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { isProduction } from '../../../utils/environment';
import withErrorBoundary from '../../../components/withErrorBoundary';
import { theme } from '../../../styles/theme';
import { useDekoratorPopdownOffset } from '../Navigasjonsmeny/useDekoratorPopdownOffset';
import useUniqueId from '../../../utils/useUniqueId';
import { UnmountClosed } from 'react-collapse';
import { getFiltreringsvalgLabel } from './getFiltreringsLabel';
import getAlleFiltreringsValgForInnhold from './getAlleFiltreringsValgForInnhold';
import { useFaktasideContext } from '../FaktaSideContext';

type NavProps = { offsetTop: number };

const StyledNav = styled.nav.attrs((props: NavProps) => ({ style: { top: `${props.offsetTop}px` } }))<NavProps>`
  border-top: ${theme.border.banner};
  background-color: white;
  padding: 1.5rem 2rem 2rem;
  @media (${theme.media.bigScreen}) {
    overflow-y: auto;
    max-height: calc(100vh - ${(props) => props.offsetTop}px);
    position: sticky;
    transition: top 0.2s;
    max-width: 14rem;
  }
  > * {
    margin-bottom: 1rem;
  }
`;

const StyledUl = styled.ul`
  li {
    margin-top: 0.6rem;
  }
`;

interface Props {
  className?: string;
}

function Filtrering(props: Props) {
  const visForContext = useVisForContext();
  const titleId = useUniqueId('filtrering');
  const offsetTop = useDekoratorPopdownOffset();
  const innhold = useFaktasideContext().innhold;
  const valgt = visForContext.value.checked;
  const ingenPasserMeg = visForContext.value.ingenPasserMeg;
  const tilgjengeligeValg = getAlleFiltreringsValgForInnhold(innhold);

  if (tilgjengeligeValg.length === 0) {
    return null;
  }

  return (
    <StyledNav className={props.className} aria-labelledby={titleId} offsetTop={offsetTop}>
      <Undertittel id={titleId}>Tilpass innhold</Undertittel>
      <Normaltekst>Velg det som passer din situasjon best:</Normaltekst>
      <StyledUl>
        {tilgjengeligeValg.map((valg) => (
          <li key={valg}>
            <Checkbox
              label={getFiltreringsvalgLabel(valg)}
              onChange={() => visForContext.dispatch({ type: 'toggle', key: valg })}
              checked={valgt.includes(valg)}
            />
          </li>
        ))}
        {!isProduction() && (
          <li>
            <Checkbox
              label={'Ingen valg passer'}
              onChange={() => visForContext.dispatch({ type: 'toggleIngenPasser' })}
              checked={ingenPasserMeg}
            />
          </li>
        )}
      </StyledUl>
      <UnmountClosed isOpened={valgt.length > 0}>
        Siden er tilpasset ved å skjule tekst som ikke er relevant for situasjonen din.
      </UnmountClosed>
      <UnmountClosed isOpened={ingenPasserMeg}>Innholdet på siden er tilpasset.</UnmountClosed>
    </StyledNav>
  );
}

export default withErrorBoundary(Filtrering, 'Filtrering');
