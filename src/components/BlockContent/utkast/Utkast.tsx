import * as React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components/macro';
import { isProduction } from '../../../utils/environment';
import { useDevContext } from '../../DevKnapper/DevContext';
import withErrorBoundary from '../../withErrorBoundary';

interface Props {
  children: ReactNode;
  erUtkast?: boolean;
  inline?: boolean;
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
  opacity: 0.75;
`;

function Utkast(props: Props) {
  const devContext = useDevContext();
  const vis = props.erUtkast !== undefined && !props.erUtkast;
  const visSomUtkast = !isProduction() && devContext.value.visUtkast;

  if (vis) {
    return <>{props.children}</>;
  }

  if (visSomUtkast) {
    return (
      <Style as={props.inline ? 'span' : undefined} title="Dette vises ikke i prod">
        {!props.inline && <Label>Utkast</Label>}
        {props.children}
      </Style>
    );
  }

  return null;
}

export function UtkastInline(props: Props) {
  return <Utkast {...props} inline={true} />;
}

export default withErrorBoundary(Utkast, 'Utkast');
