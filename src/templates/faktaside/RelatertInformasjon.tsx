import * as React from 'react';
import { Block, H2Group } from '../../utils/richTextUtils/richTextTypes';
import H2GroupMarkup from '../../components/BlockContent/H2GroupMarkup';
import { useTranslation } from 'react-i18next';

interface Props {
  blocks?: Block[];
}

function RelatertInformasjon(props: Props) {
  const { t } = useTranslation('global');

  const h2Group: H2Group = {
    tittel: t('relatertInformasjon'),
    children: props.blocks || [],
    _type: 'H2Group',
  };

  return <H2GroupMarkup node={h2Group} />;
}

export default RelatertInformasjon;
