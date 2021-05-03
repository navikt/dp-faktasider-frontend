import * as React from "react";
import { useTranslation } from "react-i18next";
import H2GroupMarkup from "../../../components/BlockContent/GroupMarkup/H2GroupMarkup";
import withErrorBoundary from "../../../components/withErrorBoundary";
import { createH2Group } from "../../../utils/richTextUtils/createGroup";
import KortFortaltIkon from "./KortFortaltIkon";
import styled from "styled-components";
import { navFrontend } from "../../../styles/navFrontend";
import { theme } from "../../../styles/theme";
import { createSanityBlock } from "../../../testUtils/createSanityBlock";
import { RichText } from "../../../utils/richTextUtils/RichText";

interface Props {
  richText: RichText;
  beskrivelse?: string;
}

const Style = styled.div`
  position: relative;
  margin: 3.5rem 0.15rem 0.15rem;
  box-shadow: 0 0 0 0.15rem ${navFrontend.navBlaLighten40};
  border-radius: ${theme.borderRadius};
`;

const IkonWrapper = styled.div`
  position: absolute;
  top: -3.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: inline-flex;
  justify-content: center;
  background-color: ${navFrontend.navBlaLighten60};
  border-radius: 50%;
  height: 5rem;
  width: 5rem;
  overflow: hidden;
  z-index: 10;
  svg {
    height: 100%;
  }
`;

function KortFortalt(props: Props) {
  const { t } = useTranslation("global");

  const h2Group = createH2Group(t("kortFortalt"), new RichText([createSanityBlock(props.beskrivelse || ""), ...props.richText.blocks]));

  return (
    <Style>
      <IkonWrapper>
        <KortFortaltIkon />
      </IkonWrapper>
      <H2GroupMarkup {...h2Group} />
    </Style>
  );
}

export default withErrorBoundary(KortFortalt, "KortFortalt");
