import * as React from "react";
import { ReactNode } from "react";
import { SanityBlock } from "../../utils/richTextUtils/richTextTypes";
import { UtkastInline } from "./utkast/Utkast";
import SanityBlockContent from "@sanity/block-content-to-react";
import allChildrenMarkedWith, { getCommonVisForConfig } from "../../utils/richTextUtils/allChildrenMarkedWith";
import VisFor from "./VisFor/VisFor";
import VisPaaSide from "./VisFor/VisPaaSide";

interface Props {
  node: SanityBlock;
}

// kopiert fra https://github.com/sanity-io/block-content-to-react#customizing-the-default-serializer-for-block-type
function ListItemRenderer(props: Props): ReactNode {
  const serializedListItem = SanityBlockContent.defaultSerializers.listItem(props);

  const heleErUtkast = allChildrenMarkedWith(props.node, "utkast");
  const commonVisForConfig = getCommonVisForConfig(props.node);

  return (
    <VisPaaSide visPaaSider={commonVisForConfig?.visPaa}>
      <UtkastInline erUtkast={heleErUtkast}>
        <VisFor visForConfig={commonVisForConfig?.visFor}>{serializedListItem}</VisFor>
      </UtkastInline>
    </VisPaaSide>
  );
}

export default ListItemRenderer;
