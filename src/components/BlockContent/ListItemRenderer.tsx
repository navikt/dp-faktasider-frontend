import * as React from 'react';
import { ReactNode } from 'react';
import { SanityBlock } from '../../utils/richTextUtils/richTextTypes';
import { UtkastInline } from './utkast/Utkast';
import SanityBlockContent from '@sanity/block-content-to-react';
import allChildrenMarkedWith, { getCommonVisForConfig } from '../../utils/richTextUtils/allChildrenMarkedWith';
import VisFor from './VisFor/VisFor';

interface Props {
  node: SanityBlock;
}

// kopiert fra https://github.com/sanity-io/block-content-to-react#customizing-the-default-serializer-for-block-type
function ListItemRenderer(props: Props): ReactNode {
  const serializedListItem = SanityBlockContent.defaultSerializers.listItem(props);

  if (allChildrenMarkedWith(props.node, 'utkast')) {
    return <UtkastInline>{serializedListItem}</UtkastInline>;
  }

  const commonVisForConfig = getCommonVisForConfig(props.node);
  if (commonVisForConfig) {
    return <VisFor visFor={commonVisForConfig}>{serializedListItem}</VisFor>;
  }

  return serializedListItem;
}

export default ListItemRenderer;
