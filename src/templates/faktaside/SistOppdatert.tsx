import styled from 'styled-components';
import { format } from 'date-fns';
import React from 'react';

const Style = styled.div`
  padding: 1rem;
  text-align: center;
`;
interface Props {
  publiseringsTidspunkt: Date;
}
export function SistOppdatert(props: Props) {
  console.log(props.publiseringsTidspunkt);
  const formattertTidspunkt = format(props.publiseringsTidspunkt, 'dd.MM.yyyy HH:mm');

  return <Style>{formattertTidspunkt}</Style>;
}
