import * as React from 'react';
import { useVisFor } from '../../../components/BlockContent/VisFor/VisForContext';
import styled from 'styled-components';
import { Checkbox } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import { isProduction } from '../../../utils/environment';

const Style = styled.ul`
  li {
    margin-top: 0.5rem;
  }
`;

function Filtrering() {
  const visForContext = useVisFor();

  if (isProduction() || visForContext.valg.length === 0) {
    return null;
  }

  return (
    <Style>
      <Undertittel>Filtrering</Undertittel>
      {visForContext.valg.map((valg) => (
        <li>
          <Checkbox
            label={valg}
            onChange={() => visForContext.toggle(valg)}
            checked={visForContext.checked.includes(valg)}
          />
        </li>
      ))}
    </Style>
  );
}

export default Filtrering;
