import styled from 'styled-components';
import React from 'react';
import { useTranslation } from 'react-i18next';
import withErrorBoundary from '../../components/withErrorBoundary';

const Style = styled.div`
  padding: 1rem;
  text-align: center;
`;

interface Props {
  publiseringsTidspunkt: string;
}

function SistOppdatert(props: Props) {
  const { t } = useTranslation('global');
  return <Style>{t('sistOppdatert', { publiseringstidspunkt: new Date(props.publiseringsTidspunkt) })}</Style>;
}

export default withErrorBoundary(SistOppdatert);
