import * as React from 'react';
import { ReactNode } from 'react';
import { SanityBlock } from '../../utils/richTextUtils/richTextTypes';
import { UtkastInline } from './utkast/Utkast';
import SanityBlockContent from '@sanity/block-content-to-react';
import allChildrenMarkedWith, { getCommonVisForConfig } from '../../utils/richTextUtils/allChildrenMarkedWith';
import VisFor from './VisFor/VisFor';
import { ConditionalWrapper } from '../ConditionalWrapper';
import VisPaaSide from './VisFor/VisPaaSide';

interface Props {
  node: SanityBlock;
}

// kopiert fra https://github.com/sanity-io/block-content-to-react#customizing-the-default-serializer-for-block-type
function ListItemRenderer(props: Props): ReactNode {
  const serializedListItem = SanityBlockContent.defaultSerializers.listItem(props);

  const heleErUtkast = allChildrenMarkedWith(props.node, 'utkast');
  const commonVisForConfig = getCommonVisForConfig(props.node);

  return (
    <ConditionalWrapper
      condition={!!commonVisForConfig?.visFor}
      wrapper={(children) => <VisFor children={children} visFor={commonVisForConfig?.visFor} />}
    >
      <ConditionalWrapper
        condition={!!commonVisForConfig?.visPaa}
        wrapper={(children) => <VisPaaSide children={children} visPaaSider={commonVisForConfig?.visPaa} />}
      >
        <ConditionalWrapper condition={heleErUtkast} wrapper={(children) => <UtkastInline children={children} />}>
          {serializedListItem}
        </ConditionalWrapper>
      </ConditionalWrapper>
    </ConditionalWrapper>
  );
}

export default ListItemRenderer;
