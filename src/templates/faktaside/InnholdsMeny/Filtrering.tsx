import * as React from 'react';
import { useVisForContext } from '../../../components/BlockContent/VisFor/VisForContext';
import styled from 'styled-components';
import { Checkbox } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import { isProduction } from '../../../utils/environment';

const Style = styled.ul`
  margin-top: 1rem;
  li {
    margin-top: 1rem;
  }
`;

function Filtrering() {
  const visForContext = useVisForContext();

  if (isProduction() || visForContext.value.valg.length === 0) {
    return null;
  }

  return (
    <Style>
      <Undertittel>Filtrering</Undertittel>
      {visForContext.value.valg.map((valg) => (
        <li>
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
  );
}

export default Filtrering;
