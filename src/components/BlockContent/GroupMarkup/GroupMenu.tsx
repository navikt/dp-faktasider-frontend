import * as React from "react";
import styled from "styled-components/macro";
import { LenkeUtenUnderstrek } from "../../../utils/common-styled-components";
import { loggH2MenyKlikk } from "../../../utils/logging";
import useUniqueId from "../../../utils/useUniqueId";
import { Group } from "../../../utils/richTextUtils/parser/groupParser/groupParser";

interface Props {
  underGrupper: Group[];
  title: string;
}

const StyledLi = styled.li`
  margin: 0.6rem 0 !important;
`;

const StyledUl = styled.ul`
  list-style: disc;
  margin-left: 1rem;
`;

function GroupMenu(props: Props) {
  const id = useUniqueId("meny-" + props.title);

  const handleOnClick = () => {
    loggH2MenyKlikk();
  };

  return (
    <nav className="typo-normal" aria-labelledby={id}>
      <h3 className="sr-only" id={id}>
        Innhold {props.title}
      </h3>
      <StyledUl>
        {props.underGrupper.map((underGruppe) => (
          <StyledLi key={underGruppe.blockConfig?.id}>
            <LenkeUtenUnderstrek onClick={handleOnClick} href={"#" + underGruppe.blockConfig?.id}>
              {underGruppe.title}
            </LenkeUtenUnderstrek>
          </StyledLi>
        ))}
      </StyledUl>
    </nav>
  );
}

export default GroupMenu;
