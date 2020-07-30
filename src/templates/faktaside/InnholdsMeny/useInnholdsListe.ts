import { useTranslation } from 'react-i18next';
import { Group, isH2Group } from '../../../utils/richTextUtils/richTextTypes';
import { useFaktasideContext } from '../FaktaSideContext';
import { idFromString } from '../../../utils/idFromString';
import { visBasertPåFiltrering } from '../../../components/BlockContent/VisFor/VisFor';
import { useVisForContext } from '../../../components/BlockContent/VisFor/VisForContext';

export function useInnholdsListe(): Group[] {
  const { innhold, relatertInformasjon } = useFaktasideContext();
  const { t } = useTranslation('global');
  const visForContext = useVisForContext();

  if (!innhold) {
    return [];
  }

  let h2Groups = innhold
    .filter((block) => isH2Group(block) && !block.blockConfig?.erUtkast)
    .filter(
      (block) => isH2Group(block) && visBasertPåFiltrering(visForContext, block.blockConfig?.visFor).vis
    ) as Group[];

  if (relatertInformasjon) {
    const relatertInnformasjon: Group = {
      title: t('relatertInformasjon'),
      _type: 'group',
      style: 'h2',
      children: [],
      blockConfig: {
        id: idFromString(t('relatertInformasjon')),
      },
    };
    h2Groups.push(relatertInnformasjon);
  }

  return h2Groups;
}
