import * as React from "react";
import styled from "styled-components/macro";
import { Element } from "nav-frontend-typografi";
import CommonSectionMarkup, { CommonSectionProps } from "./CommonSectionMarkup";

const StyledSection = styled.section`
  margin: 0 -1rem 0;
  padding: 1rem; //gjøres for å gi luft til outline når seksjonen har fokus
`;

const StyledTittel = styled(Element).attrs({ as: "h4", className: "typo-element" })`
  margin-bottom: 0.7rem;
`;

function H4Section(props: CommonSectionProps) {
  return <CommonSectionMarkup header={StyledTittel} region={StyledSection} anchorMarginTop="6rem" {...props} />;
}

export default H4Section;
