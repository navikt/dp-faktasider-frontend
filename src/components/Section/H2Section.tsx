import React from "react";
import { Title } from "@navikt/ds-react";
import styled, { css } from "styled-components/macro";
import { theme } from "../../styles/theme";
import Section, { CommonSectionProps } from "./CommonSectionMarkup";

type RegionProps = { noBackground?: boolean };

const StyledArticle = styled.article<RegionProps>`
  ${(props) =>
    !props.noBackground &&
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

type TittelProps = { noBackground?: boolean };

const StyledTittel = styled(Title).attrs({
  level: "2",
  size: "xl",
})<TittelProps>`
  background-color: ${(props) => (props.noBackground ? theme.colors.bakgrunn : "#fffe")};
  padding: 1rem;
  position: sticky !important;
  top: 0;
  transition: top 0.2s;
  z-index: 10;
  margin-bottom: 1.5rem !important;
  text-align: center;
`;

interface Props extends CommonSectionProps {
  noBackground?: boolean;
}

function H2Section(props: Props) {
  const headerProps: TittelProps = { noBackground: props.noBackground };
  const regionProps: RegionProps = { noBackground: props.noBackground };

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
