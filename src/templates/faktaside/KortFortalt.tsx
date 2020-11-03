import * as React from "react";
import { Block } from "../../utils/richTextUtils/richTextTypes";
import { useTranslation } from "react-i18next";
import H2GroupMarkup from "../../components/BlockContent/GroupMarkup/H2GroupMarkup";
import withErrorBoundary from "../../components/withErrorBoundary";
import { createH2Group } from "../../utils/richTextUtils/createGroup";

interface Props {
  blocks?: Block[];
}

function KortFortalt(props: Props) {
  const { t } = useTranslation("global");

  const blocks = props.blocks;
  if (!blocks || !blocks.length) {
    return null;
  }

  const h2Group = createH2Group(t("kortFortalt"), blocks);

  return <H2GroupMarkup {...h2Group} />;
}

export default withErrorBoundary(KortFortalt, "KortFortalt");
