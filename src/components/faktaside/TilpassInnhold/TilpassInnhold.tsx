import React, { RefObject, useRef } from "react";
import { useVisForContext } from "../../BlockContent/VisFor/VisForContext";
import styled from "styled-components";
import { theme } from "../../../styles/theme";
import { UnmountClosed } from "react-collapse";
import { useFaktasideContext } from "../FaktaSideContext";
import { useWordCount } from "./useWordCount";
import { navFrontend } from "../../../styles/navFrontend";
import { InnholdetErTilpasset } from "./InnholdetErTilpasset";
import { BodyShort, Heading } from "@navikt/ds-react";
import Checkbox from "../../Checkbox";
import { TestId } from "../../../utils/test-ids";

const StyledNav = styled.nav`
  background-color: white;
  padding: ${theme.layoutPadding} calc(${theme.layoutPadding} * 1.75);
  margin-bottom: ${theme.layoutMargin};
  border-radius: ${theme.borderRadius};

  > * {
    margin-bottom: 1rem !important;
  }
`;

const StyledUl = styled.ul`
  list-style: none !important;
  padding-left: 0 !important;

  li {
    margin-top: 0.6rem;
  }
`;

const StyledUndertittel = styled(Heading).attrs({ level: "2", size: "large" })`
  margin-bottom: ${theme.layoutPadding} !important;

  &::after {
    border-bottom: ${navFrontend.navGra40} 0.1rem solid;
    content: "";
    display: block;
    margin-top: 1rem;
  }
`;

interface Props {
  className?: string;
  wordCountRef: RefObject<HTMLElement>;
}

export function TilpassInnhold(props: Props) {
  const tilpassInnholdRef = useRef<HTMLDivElement>(null);
  const visForContext = useVisForContext();
  const { visIngenValgPasser, tilpassInnholdValg } = useFaktasideContext();
  const valgt = visForContext.value.checked;
  const ingenPasserMeg = visForContext.value.ingenPasserMeg;
  const faktasideWordCount = useWordCount(props.wordCountRef);
  const tilpassInnholdWordCount = useWordCount(tilpassInnholdRef);
  const currentWords = faktasideWordCount.current - tilpassInnholdWordCount.current;
  const totalWords = faktasideWordCount.total - tilpassInnholdWordCount.total;

  if (tilpassInnholdValg.length === 0) {
    return null;
  }

  return (
    <div ref={tilpassInnholdRef}>
      <StyledNav className={props.className} data-test-id={TestId.TILPASS_INNHOLD}>
        <StyledUndertittel> Tilpass innhold</StyledUndertittel>
        <BodyShort>Velg det som passer din situasjon best:</BodyShort>
        <StyledUl>
          {tilpassInnholdValg.map((valg) => (
            <li key={valg}>
              <Checkbox
                label={valg}
                onChange={() => visForContext.dispatch({ type: "toggle", key: valg })}
                checked={valgt.includes(valg)}
              />
            </li>
          ))}
          {visIngenValgPasser && (
            <li>
              <Checkbox
                label={"Ingen valg passer"}
                onChange={() => visForContext.dispatch({ type: "toggleIngenPasser" })}
                checked={ingenPasserMeg}
              />
            </li>
          )}
        </StyledUl>
        <UnmountClosed isOpened={valgt.length > 0 || ingenPasserMeg}>
          Vi viser nå {currentWords} av {totalWords} ord på denne siden
        </UnmountClosed>
      </StyledNav>
      <InnholdetErTilpasset />
    </div>
  );
}
