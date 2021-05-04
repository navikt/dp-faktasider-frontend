import * as React from "react";
import styled from "styled-components/macro";
import { Element } from "nav-frontend-typografi";
import CommonSectionMarkup, { CommonSectionProps } from "./CommonSectionMarkup";

const StyledSection = styled.section`
  margin: 3rem 0 2rem;
`;

const StyledTittel = styled(Element).attrs({ as: "h4", className: "typo-element" })`
  margin: 3rem 0 0.7rem !important;
`;

function H4Section(props: CommonSectionProps) {
  return <CommonSectionMarkup header={StyledTittel} region={StyledSection} anchorMarginTop="6rem" {...props} />;
}

export default H4Section;
