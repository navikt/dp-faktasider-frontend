import * as React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components/macro';
import { isProduction } from '../../utils/environment';
import { useDevContext } from '../DevKnapper/DevContext';
import withErrorBoundary from '../withErrorBoundary';

interface Props {
  children: ReactNode;
}

const Style = styled.div`
  position: relative;
  box-shadow: 0 0 0 0.2rem #ff0a;
  background-color: #ff02;
`;

const Label = styled.div`
  position: absolute;
  right: -2rem;
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
  opacity: 0.6;
`;

function Utkast(props: Props) {
  const devContext = useDevContext();
  if (isProduction() || !devContext.value.visUtkast) {
    return null;
  }

  return (
    <Style title="Dette vises ikke i prod">
      <Label>Utkast</Label>
      {props.children}
    </Style>
  );
}

export function UtkastInline(props: { children: ReactNode }) {
  const devContext = useDevContext();
  if (isProduction() || !devContext.value.visUtkast) {
    return null;
  }

  return (
    <Style as="span" title="Dette vises ikke i prod">
      {props.children}
    </Style>
  );
}

export default withErrorBoundary(Utkast);
