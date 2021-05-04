import * as React from "react";
import styled from "styled-components/macro";
import { Systemtittel } from "nav-frontend-typografi";
import CommonSectionMarkup, { CommonGroupProps } from "./CommonSectionMarkup";

const StyledSection = styled.section`
  margin: 3rem 0 2rem;
`;

const StyledTittel = styled(Systemtittel).attrs({ as: "h3", className: "typo-systemtittel" })`
  margin-bottom: 1rem !important;
`;

function H3Section(props: CommonGroupProps) {
  return <CommonSectionMarkup header={StyledTittel} region={StyledSection} anchorMarginTop="6rem" {...props}/>;
}

export default H3Section;
