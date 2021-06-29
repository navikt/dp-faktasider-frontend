import * as React from "react";
import { ReactNode } from "react";
import { SanityBlock } from "../../utils/richTextUtils/richTextTypes";
import { UtkastInline } from "./utkast/Utkast";
import SanityBlockContent from "@sanity/block-content-to-react";
import allChildrenMarkedWith from "../../utils/richTextUtils/allChildrenMarkedWith";

interface Props {
  node: SanityBlock;
}

// kopiert fra https://github.com/sanity-io/block-content-to-react#customizing-the-default-serializer-for-block-type
function ListItemRenderer(props: Props): ReactNode {
  const serializedListItem = SanityBlockContent.defaultSerializers.listItem(props);

  const heleErUtkast = allChildrenMarkedWith(props.node, "utkast");

  return <UtkastInline erUtkast={heleErUtkast}>{serializedListItem}</UtkastInline>;
}

export default ListItemRenderer;
