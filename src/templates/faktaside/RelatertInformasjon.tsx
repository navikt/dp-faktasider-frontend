import * as React from 'react';
import { Block, Group } from '../../utils/richTextUtils/richTextTypes';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { idFromString } from '../../utils/idFromString';
import H2GroupMarkup from '../../components/BlockContent/GroupMarkup/H2GroupMarkup';
import withErrorBoundary from '../../components/withErrorBoundary';

interface Props {
  blocks?: Block[];
}

const Style = styled.div`
  text-align: center;
  ul {
    list-style: none;
    @media (${theme.media.bigScreen}) {
      column-count: 2;
      a {
        justify-content: center;
      }
    }
  }
`;

function RelatertInformasjon(props: Props) {
  const { t } = useTranslation('global');

  const blocks = props.blocks;
  if (!blocks || !blocks.length) {
    return null;
  }

  const h2Group: Group = {
    title: t('relatertInformasjon'),
    children: blocks,
    _type: 'group',
    style: 'h2',
    blockConfig: {
      id: idFromString(t('relatertInformasjon')),
    },
  };

  return (
    <Style>
      <H2GroupMarkup {...h2Group} />
    </Style>
  );
}

export default withErrorBoundary(RelatertInformasjon, 'RelatertInformasjon');
