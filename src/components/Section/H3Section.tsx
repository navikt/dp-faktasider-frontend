import * as React from "react";
import styled from "styled-components/macro";
import CommonSectionMarkup, { CommonSectionProps } from "./CommonSectionMarkup";
import { Title } from "@navikt/ds-react";

const StyledSection = styled.section`
  margin: 1.5rem -1rem -1rem;
  padding: 1rem; //gjøres for å gi luft til outline når seksjonen har fokus
`;

const StyledTittel = styled(Title).attrs({ level: "3", spacing: true, size: "l" })`
  margin-bottom: 1rem;
`;

function H3Section(props: CommonSectionProps) {
  return <CommonSectionMarkup header={StyledTittel} region={StyledSection} anchorMarginTop="7rem" {...props} />;
}

export default H3Section;
