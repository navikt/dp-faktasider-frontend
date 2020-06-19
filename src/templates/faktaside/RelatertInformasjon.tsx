import * as React from 'react';
import { Block, Group } from '../../utils/richTextUtils/richTextTypes';
import H2GroupMarkup from '../../components/BlockContent/H2GroupMarkup';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface Props {
  blocks?: Block[];
}

const Style = styled.div`
  text-align: center;
  @media (${theme.media.bigScreen}) {
    ul {
      list-style: none;
      column-count: 2;
      a {
        white-space: nowrap;
        justify-content: center;
      }
    }
  }
`;

function RelatertInformasjon(props: Props) {
  const { t } = useTranslation('global');

  const blocks = props.blocks;
  if (!blocks) {
    return null;
  }

  const h2Group: Group = {
    title: t('relatertInformasjon'),
    children: blocks,
    _type: 'group',
    groupType: 'h2',
  };

  return (
    <Style>
      <H2GroupMarkup {...h2Group} />
    </Style>
  );
}

export default RelatertInformasjon;
