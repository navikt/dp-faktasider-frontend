import { useTranslation } from 'react-i18next';
import { Group, isH2Group } from '../../../utils/richTextUtils/richTextTypes';
import { useFaktasideContext } from '../FaktaSideContext';

export function useInnholdsListe(): Group[] {
  const { parsedRichText, data } = useFaktasideContext();
  const { t } = useTranslation('global');

  if (!parsedRichText) {
    return [];
  }

  let innhold = parsedRichText.filter((block) => isH2Group(block) && !block.blockConfig?.erUtkast) as Group[];

  if (data?.side._rawRelatertInformasjon) {
    const relatertInnformasjon: Group = {
      title: t('relatertInformasjon'),
      _type: 'group',
      style: 'h2',
      children: [],
      blockConfig: {
        id: t('relatertInformasjon'),
      },
    };
    innhold.push(relatertInnformasjon);
  }

  return innhold;
}
