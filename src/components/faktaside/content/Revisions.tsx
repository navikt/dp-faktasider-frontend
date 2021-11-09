import styled from "styled-components/macro";
import compareDesc from "date-fns/compareDesc";
import { Revision } from "../../historikk/api/revisionsFetcher";
import Link from "next/link";
import { formaterDato } from "../../../utils/formaterDato";
import { css } from "styled-components";
import React from "react";
import { loggHistorikk } from "../../../utils/logging";
import { useHistorikkContext } from "../../historikk/HistorikkContext";

const StyledNav = styled.nav``;

const StyledLenke = styled.a<{ current: boolean }>`
  display: block;
  ${(props) =>
    props.current &&
    css`
      font-weight: bold;
    `}
`;

interface Props {
  documentId: string;
  revisions: Revision[];
  currentRevision?: string;
}

// Denne lista er ikke komplett. Her regnes ikke delte tekster og notifikasjoner med feks, de kan være oppdatert uten at det vises her. Dersom en delt tekst som trekkes inn er oppdatert vil det være en endring ut mot bruker, så for at denne lista skal kunne brukes må det regnes inn på et vis.
function Revisions(props: Props) {
  const sortedRevisions = props.revisions?.sort((a, b) => compareDesc(new Date(a.timestamp), new Date(b.timestamp)));
  const context = useHistorikkContext();

  return (
    <StyledNav>
      {sortedRevisions?.map((rev) => {
        const current = props.currentRevision === rev.id;
        const formatertDato = formaterDato(rev.timestamp);
        return (
          <Link prefetch={false} key={rev.id} href={`/historikk/${props.documentId}/${rev.timestamp}`} passHref>
            <StyledLenke
              current={current}
              className="lenke"
              onClick={() => loggHistorikk("Ny dato valgt", { ...context.loggingInfo, nyDato: formatertDato })}
            >
              {formatertDato}
              {current && " (Vises nå)"}
            </StyledLenke>
          </Link>
        );
      })}
    </StyledNav>
  );
}

export default Revisions;
