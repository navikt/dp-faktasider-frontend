import * as React from "react";
import styled, { css } from "styled-components/macro";
import { Group, isH3Group } from "../../../utils/richTextUtils/richTextTypes";
import { theme } from "../../../styles/theme";
import { Innholdstittel } from "nav-frontend-typografi";
import H2GroupMenu from "./H2GroupMenu";
import CommonGroupMarkup from "./CommonGroupMarkup";

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

const StyledTittel = styled(Innholdstittel).attrs({
  as: "h2",
  className: "typo-innholdstittel",
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

function H2GroupMarkup(props: Group) {
  const noBackground = props.blockConfig?.noBackground;
  const underGrupper = props.children.filter(isH3Group);

  const headerProps: TittelProps = { noBackground };
  const regionProps: RegionProps = { noBackground };

  return (
    <CommonGroupMarkup
      header={StyledTittel}
      headerProps={headerProps}
      region={StyledArticle}
      regionProps={regionProps}
      group={props}
      beforeContent={props.blockConfig?.meny && <H2GroupMenu title={props.title} underGrupper={underGrupper} />}
    />
  );
}

export default H2GroupMarkup;
