import * as React from "react";
import styled from "styled-components/macro";
import { Sidetittel } from "nav-frontend-typografi";
import SistOppdatert from "./SistOppdatert";
import { useFaktasideContext } from "../FaktaSideContext";
import Revisions from "./Revisions";
import Utkast from "../../BlockContent/utkast/Utkast";

const Style = styled.div`
  text-align: center;
  margin: 1rem auto 2rem;
  max-width: 38rem;
`;

const StyledSidetittel = styled(Sidetittel)`
  margin-bottom: 0.75rem !important;
`;

function Header() {
  const faktaside = useFaktasideContext();
  return (
    <Style>
      <StyledSidetittel>{faktaside.title}</StyledSidetittel>
      <SistOppdatert publiseringsTidspunkt={faktaside.publiseringsTidspunkt} />
      <Utkast>
        <Revisions documentId={faktaside.id} revisions={faktaside.revisions} />
      </Utkast>
    </Style>
  );
}

export default Header;
