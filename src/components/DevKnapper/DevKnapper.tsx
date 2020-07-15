import * as React from 'react';
import styled, { css } from 'styled-components';
import { useReducer, useRef } from 'react';
import { isDevelopment } from '../../utils/environment';
import { useClickAway } from 'react-use';
import { useDevContext } from './DevContext';
import { Checkbox } from 'nav-frontend-skjema';
import withErrorBoundary from '../withErrorBoundary';
import { Link } from 'gatsby';

const Style = styled.div<{ open: boolean }>`
  position: fixed;
  right: 1rem;
  top: 3rem;
  ${(props) =>
    props.open &&
    css`
      background-color: #555;
      box-shadow: 0 0 0 0.2rem yellow;
      border-radius: 0.5rem;
    `};
  z-index: 1500;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: white;
`;

const Button = styled.button`
  border-radius: 50%;
  box-shadow: 0 0 0 0.2rem yellow;
  background-color: #555;
  color: white;
  font-weight: bold;
  height: 3rem;
  width: 3rem;
  cursor: pointer;
  opacity: 0.9;
`;

const Innhold = styled.div`
  padding: 1rem;
  > * {
    margin-bottom: 0.5rem;
  }
`;

const StyledLink = styled(Link)`
  color: white;
`;

function reducer(state: boolean, action: 'toggle' | 'close') {
  switch (action) {
    case 'toggle':
      return !state;
    case 'close':
      return false;
    default:
      return state;
  }
}

function DevKnapper() {
  const [open, dispatch] = useReducer(reducer, false);
  const ref = useRef<HTMLDivElement>(null);
  const context = useDevContext();

  useClickAway(ref, () => dispatch('close'));

  if (!isDevelopment()) {
    return null;
  }

  return (
    <Style open={open} ref={ref}>
      <Button onClick={() => dispatch('toggle')}>dev</Button>
      {open && (
        <Innhold>
          <Checkbox onClick={() => context.toggle('utkast')} label="Vis utkast" checked={context.value.visUtkast} />
          <Checkbox
            onClick={() => context.toggle('filtrering')}
            label="Highlight filtrering"
            checked={context.value.highlightFiltrering}
          />
          <Checkbox
            onClick={() => context.toggle('delteTekster')}
            label="Debug delte tekster"
            checked={context.value.debugDelteTekster}
          />
          <StyledLink to="/testdata">Visualisering av test-data</StyledLink>
        </Innhold>
      )}
    </Style>
  );
}

export default withErrorBoundary(DevKnapper, 'DevKnapper');
