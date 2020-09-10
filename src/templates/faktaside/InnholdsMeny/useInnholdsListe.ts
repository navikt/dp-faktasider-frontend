import { useTranslation } from 'react-i18next';
import { Group, isH2Group } from '../../../utils/richTextUtils/richTextTypes';
import { useFaktasideContext } from '../FaktaSideContext';
import { idFromString } from '../../../utils/idFromString';

function getInnholdslisteItem(title): Group {
  return {
    title: title,
    _type: 'group',
    style: 'h2',
    children: [],
    blockConfig: {
      id: idFromString(title),
    },
  };
}

export function useInnholdsListe(): Group[] {
  const { innhold, relatertInformasjon, kortFortalt } = useFaktasideContext();
  const { t } = useTranslation('global');

  if (!innhold) {
    return [];
  }

  let h2Groups = innhold.filter((block) => isH2Group(block)) as Group[];

  if (kortFortalt?.length) {
    h2Groups.unshift(getInnholdslisteItem(t('kortFortalt')));
  }

  if (relatertInformasjon?.length) {
    h2Groups.push(getInnholdslisteItem(t('relatertInformasjon')));
  }

  return h2Groups;
}
