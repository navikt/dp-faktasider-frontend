import React from "react";
import { Heading } from "@navikt/ds-react";
import styled, { css } from "styled-components";
import { theme } from "../../styles/theme";
import Section, { CommonSectionProps } from "./CommonSectionMarkup";

type RegionProps = { nobackground?: boolean };

const StyledArticle = styled.article<RegionProps>`
  ${(props) =>
    !props.nobackground &&
    css`
      background-color: white;
      padding: ${theme.layoutPadding} calc(${theme.layoutPadding} * 1.75);
      @media (${theme.media.smallScreen}) {
        padding: 1.5rem 5vw;
      }
      border-radius: ${theme.borderRadius};
    `};
  margin-bottom: ${theme.layoutMargin};
  max-width: 100vw;
  position: relative;
`;

type TittelProps = { nobackground?: boolean };

const StyledTittel = styled(Heading).attrs({
  level: "2",
  size: "xlarge",
})<TittelProps>`
  background-color: ${(props) => (props.nobackground ? theme.colors.bakgrunn : "#fffe")};
  padding: 1rem;
  position: sticky !important;
  top: 0;
  transition: top 0.2s;
  z-index: 10;
  margin-bottom: 1.5rem !important;
  text-align: center;
`;

interface Props extends CommonSectionProps {
  nobackground?: boolean;
}

function H2Section(props: Props) {
  const headerProps: TittelProps = { nobackground: props.nobackground };
  const regionProps: RegionProps = { nobackground: props.nobackground };

  return (
    <Section
      header={StyledTittel}
      headerProps={headerProps}
      region={StyledArticle}
      regionProps={regionProps}
      title={props.title}
      id={props.id}
    >
      {props.children}
    </Section>
  );
}

export default H2Section;
