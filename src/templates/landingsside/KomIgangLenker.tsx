import { EksternLenkeI } from '../../hooks/graphQl/useProjectData';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { ForsideLenkePanel } from './ForsideLenkePanel';
import { EksternLenke } from './ForsideLenker';

export function KomIgangLenker(props: { komIgangLenker?: EksternLenkeI[] }) {
  const { t } = useTranslation('global');

  if (!props.komIgangLenker?.length) {
    return null;
  }

  return (
    <ForsideLenkePanel title={t('forsideKomIgangHeader')}>
      {props.komIgangLenker?.map((lenke) => (
        <EksternLenke lenke={lenke} key={lenke.url} />
      ))}
    </ForsideLenkePanel>
  );
}
