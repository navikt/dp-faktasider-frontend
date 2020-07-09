import * as React from 'react';
import { useVisForContext } from '../../../components/BlockContent/VisFor/VisForContext';
import styled from 'styled-components';
import { Checkbox } from 'nav-frontend-skjema';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import { isProduction } from '../../../utils/environment';
import withErrorBoundary from '../../../components/withErrorBoundary';
import { theme } from '../../../styles/theme';
import { useRef } from 'react';
import { guid } from 'nav-frontend-js-utils';

const StyledNav = styled.nav`
  background-color: white;
  padding: 1.5rem 2rem 2rem;
  @media (${theme.media.bigScreen}) {
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
  const titleId = useRef(guid()).current;

  if (isProduction() || visForContext.value.valg.length === 0) {
    return null;
  }

  return (
    <StyledNav className={props.className} aria-labelledby={titleId}>
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

export default withErrorBoundary(Filtrering);
