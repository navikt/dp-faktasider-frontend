import React from "react";
import { BodyShort } from "@navikt/ds-react";
import { MenylenkeEkstern } from "../../sanity/groq/menu/menuQuery";

interface Props {
  link: MenylenkeEkstern;
}

export function ExternalLink(props: Props) {
  return (
    <a href={props.link.url} data-test-id={props.link.url}>
      <BodyShort className="navds-link">{props.link.tittel}</BodyShort>
      <p>{props.link.beskrivelse}</p>
    </a>
  );
}
