import * as React from "react";
import styled from "styled-components/macro";
import { Systemtittel } from "nav-frontend-typografi";
import { Group } from "../../../utils/richTextUtils/richTextTypes";
import CommonGroupMarkup from "./CommonGroupMarkup";

const StyledSection = styled.section`
  margin: 3rem 0 2rem;
`;

const StyledTittel = styled(Systemtittel).attrs({ as: "h3", className: "typo-systemtittel" })`
  margin-bottom: 1rem !important;
`;

function H3GroupMarkup(props: Group) {
  return <CommonGroupMarkup header={StyledTittel} region={StyledSection} group={props} anchorMarginTop="6rem" />;
}

export default H3GroupMarkup;
