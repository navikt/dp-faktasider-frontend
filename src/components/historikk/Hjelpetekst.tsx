import { Helptext } from "@navikt/ds-icons";
import React, { ReactNode, useRef, useState } from "react";
import styled from "styled-components";
import useUniqueId from "../../utils/useUniqueId";
import { theme } from "../../styles/theme";
import { Popover } from "@navikt/ds-react";

const Knapp = styled.button`
  background-color: transparent;
  border: none;
  color: ${theme.colors.navBla};
  cursor: pointer;
`;

const PopoverContent = styled.div`
  max-width: 20rem;
  padding: 0.75rem;
`;

interface Props {
  tittel: string;
  onClick?: () => void;
  children: ReactNode;
}

// Kan sansynligvis byttes ut med Hjelpetekst fra designsystemet når dette kommer i ds-react
function Hjelpetekst(props: Props) {
  const [open, setOpen] = useState(false);
  const id = useUniqueId("hjelp");
  const ref = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    props.onClick?.();
    setOpen(!open);
  };

  return (
    <span>
      <Knapp
        ref={ref}
        onClick={handleClick}
        title={props.tittel}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={id}
      >
        <Helptext />
      </Knapp>
      <Popover anchorEl={ref.current} onClose={() => setOpen(false)} open={open} placement="top">
        <PopoverContent id={id}>{props.children}</PopoverContent>
      </Popover>
    </span>
  );
}

export default Hjelpetekst;
