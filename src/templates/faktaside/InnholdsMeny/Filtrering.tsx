import * as React from 'react';
import { useVisForContext } from '../../../components/BlockContent/VisFor/VisForContext';
import styled from 'styled-components';
import { Checkbox } from 'nav-frontend-skjema';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { isProduction } from '../../../utils/environment';
import withErrorBoundary from '../../../components/withErrorBoundary';
import { theme } from '../../../styles/theme';
import { useDekoratorPopdownOffset } from '../Navigasjonsmeny/useDekoratorPopdownOffset';
import useUniqueId from '../../../utils/useUniqueId';

type NavProps = { offsetTop: number };

const StyledNav = styled.nav.attrs((props: NavProps) => ({ style: { top: `${props.offsetTop}px` } }))<NavProps>`
  border-top: ${theme.border.banner};
  background-color: white;
  padding: 1.5rem 2rem 2rem;
  @media (${theme.media.bigScreen}) {
    overflow-y: auto;
    max-height: calc(100vh - ${(props) => props.offsetTop}px);
    position: sticky;
    max-width: 14rem;
  }
  > * {
    margin-bottom: 1rem;
  }
`;

const Style = styled.ul`
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

  if (isProduction() || visForContext.value.valg.length === 0) {
    return null;
  }

  return (
    <StyledNav className={props.className} aria-labelledby={titleId} offsetTop={offsetTop}>
      <Undertittel id={titleId}>Tilpass innhold</Undertittel>
      <Normaltekst>Tilpass innholdet på denne siden ved å velge det som passer din situasjon best:</Normaltekst>
      <Style>
        {visForContext.value.valg.map((valg) => (
          <li key={valg}>
            <Checkbox
              label={valg}
              onChange={() => visForContext.dispatch({ type: 'toggle', key: valg })}
              checked={visForContext.value.checked.includes(valg)}
            />
          </li>
        ))}
        <li>
          <Checkbox
            label={'Ingen valg passer'}
            onChange={() => visForContext.dispatch({ type: 'toggleIngenPasser' })}
            checked={visForContext.value.ingenPasserMeg}
          />
        </li>
      </Style>
    </StyledNav>
  );
}

export default withErrorBoundary(Filtrering, 'Filtrering');
