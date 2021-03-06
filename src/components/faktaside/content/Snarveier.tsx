import * as React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components/macro";
import { theme } from "../../../styles/theme";
import H2GroupMarkup from "../../../components/BlockContent/GroupMarkup/H2GroupMarkup";
import withErrorBoundary from "../../../components/withErrorBoundary";
import { createH2Group } from "../../../utils/richTextUtils/createGroup";
import { createSanityBlock } from "../../../testUtils/createSanityBlock";
import { Snarvei } from "../../../sanity/groq/forside/forsideQuery";

interface Props {
  snarveier?: Snarvei[];
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

function Snarveier(props: Props) {
  const { t } = useTranslation("global");

  const snarveier = props.snarveier || [];
  if (!snarveier.length) {
    return null;
  }

  const h2Group = createH2Group(
    t("snarveier"),
    snarveier.map((snarvei) => createSanityBlock(snarvei.tittel, { listItem: "bullet", linkTo: snarvei.url }))
  );

  return (
    <Style>
      <H2GroupMarkup {...h2Group} />
    </Style>
  );
}

export default withErrorBoundary(Snarveier, "Snarveier");
