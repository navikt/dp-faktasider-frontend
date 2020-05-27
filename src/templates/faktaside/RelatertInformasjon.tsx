import * as React from 'react';
import { Block, H2Group } from '../../utils/richTextUtils/richTextTypes';
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

  const h2Group: H2Group = {
    tittel: t('relatertInformasjon'),
    children: props.blocks || [],
    _type: 'H2Group',
  };

  return (
    <Style>
      <H2GroupMarkup node={h2Group} />
    </Style>
  );
}

export default RelatertInformasjon;
