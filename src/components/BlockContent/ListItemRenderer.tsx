import * as React from 'react';
import { ReactNode } from 'react';
import { SanityBlock } from '../../utils/richTextUtils/richTextTypes';
import { UtkastInline } from './Utkast';
import SanityBlockContent from '@sanity/block-content-to-react';

interface Props {
  node: SanityBlock;
}

// kopiert fra https://github.com/sanity-io/block-content-to-react#customizing-the-default-serializer-for-block-type
function ListItemRenderer(props: Props): ReactNode {
  const childrenMedInnhold = props.node.children?.filter((child) => child.text?.length);
  const kunEnTekst = childrenMedInnhold?.length === 1;
  const erUtkast = childrenMedInnhold?.[0].marks?.includes('utkast');
  const visHeleBulletpointSomUtkast = erUtkast && kunEnTekst;

  const serializedListItem = SanityBlockContent.defaultSerializers.listItem(props);

  return visHeleBulletpointSomUtkast ? <UtkastInline>{serializedListItem}</UtkastInline> : serializedListItem;
}

export default ListItemRenderer;
