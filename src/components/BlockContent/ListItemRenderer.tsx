import React, { ReactNode } from "react";
import { SanityBlock } from "../../utils/richTextUtils/richTextTypes";
import { Draft } from "./draft/Draft";
import allChildrenMarkedWith from "../../utils/richTextUtils/allChildrenMarkedWith";

// https://github.com/sanity-io/block-content-to-react/issues/26
// @ts-expect-error
import SanityBlockContent from "@sanity/block-content-to-react";

interface Props {
  node: SanityBlock;
}

// kopiert fra https://github.com/sanity-io/block-content-to-react#customizing-the-default-serializer-for-block-type
function ListItemRenderer(props: Props): ReactNode {
  const serializedListItem = SanityBlockContent.defaultSerializers.listItem(props);

  const heleErUtkast = allChildrenMarkedWith(props.node, "utkast");

  return (
    <Draft inline={true} isDraft={heleErUtkast}>
      {serializedListItem}
    </Draft>
  );
}

export default ListItemRenderer;
