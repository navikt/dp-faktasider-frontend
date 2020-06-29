import { Group, isH2Group } from './richTextTypes';
import { useTranslation } from 'react-i18next';
import { useFaktasideContext } from '../../templates/faktaside/FaktaSideContext';

export function useInnholdsListe(): Group[] {
  const { parsedRichText, data } = useFaktasideContext();
  const { t } = useTranslation('global');

  if (!parsedRichText) {
    return [];
  }

  let innhold = parsedRichText.filter((block) => isH2Group(block) && !block.config?.erUtkast) as Group[];

  if (data?.side._rawRelatertInformasjon) {
    const relatertInnformasjon: Group = {
      title: t('relatertInformasjon'),
      _type: 'group',
      style: 'h2',
      children: [],
      config: {
        id: t('relatertInformasjon'),
      },
    };
    innhold.push(relatertInnformasjon);
  }

  return innhold;
}
