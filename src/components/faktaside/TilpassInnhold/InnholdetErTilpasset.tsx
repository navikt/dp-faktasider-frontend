import * as React from "react";
import { useVisForContext } from "../../BlockContent/VisFor/VisForContext";
import { UnmountClosed } from "react-collapse";
import { Alert } from "@navikt/ds-react";
import styled from "styled-components";
import { theme } from "../../../styles/theme";
import withErrorBoundary from "../../../components/withErrorBoundary";
import { LenkeKnapp } from "../../../utils/common-styled-components";

const StyledAlertStripeInfo = styled(Alert).attrs({ variant: "info" })`
  margin-bottom: ${theme.layoutMargin};
`;

function InnholdetErTilpasset() {
  const { value, dispatch } = useVisForContext();
  const { checked, ingenPasserMeg } = value;

  return (
    <UnmountClosed isOpened={checked.length > 0 || ingenPasserMeg}>
      <StyledAlertStripeInfo>
        Siden er tilpasset ved å skjule tekst som ikke er relevant for situasjonen din.{" "}
        <LenkeKnapp onClick={() => dispatch({ type: "clear" })}>Vis alle situasjoner</LenkeKnapp>
      </StyledAlertStripeInfo>
    </UnmountClosed>
  );
}

export default withErrorBoundary(InnholdetErTilpasset, "InnholdetErTilpasset");
