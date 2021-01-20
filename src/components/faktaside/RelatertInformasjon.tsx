import * as React from "react";
import { Block } from "../../utils/richTextUtils/richTextTypes";
import { useTranslation } from "react-i18next";
import styled from "styled-components/macro";
import { theme } from "../../styles/theme";
import H2GroupMarkup from "../../components/BlockContent/GroupMarkup/H2GroupMarkup";
import withErrorBoundary from "../../components/withErrorBoundary";
import { createH2Group } from "../../utils/richTextUtils/createGroup";

interface Props {
  blocks?: Block[];
}

const Style = styled.div`
  ul {
    list-style: none;
    li {
      margin-top: 0;
    }
    @media (${theme.media.bigScreen}) {
      column-count: 2;
    }
  }
`;

function RelatertInformasjon(props: Props) {
  const { t } = useTranslation("global");

  const blocks = props.blocks;
  if (!blocks || !blocks.length) {
    return null;
  }

  const h2Group = createH2Group(t("relatertInformasjon"), blocks);

  return (
    <Style>
      <H2GroupMarkup {...h2Group} />
    </Style>
  );
}

export default withErrorBoundary(RelatertInformasjon, "RelatertInformasjon");
