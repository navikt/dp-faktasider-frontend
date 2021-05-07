import { format } from "date-fns";
import styled from "styled-components/macro";
import compareDesc from "date-fns/compareDesc";
import { Revision } from "../../../sanity/revisionsFetcher";
import Link from "next/link";

const Style = styled.div``;

const StyledLenke = styled.a`
  display: block;
`;

interface Props {
  documentId: string;
  revisions: Revision[];
  currentRevision?: string;
}

// Denne lista er ikke komplett. Her regnes ikke delte tekster og notifikasjoner med feks, de kan være oppdatert uten at det vises her. Dersom en delt tekst som trekkes inn er oppdatert vil det være en endring ut mot bruker, så for at denne lista skal kunne brukes må det regnes inn på et vis.
function Revisions(props: Props) {
  const sortedRevisions = props.revisions?.sort((a, b) => compareDesc(new Date(a.timestamp), new Date(b.timestamp)));

  return (
    <Style>
      <details>
        <summary>{props.currentRevision ? format(new Date(props.currentRevision), "PPpp") : "Historikk"}</summary>
        {sortedRevisions?.map((rev) => (
          <Link key={rev.id} href={`/historikk/${props.documentId}/${rev.timestamp}`} passHref>
            <StyledLenke className="lenke">{format(new Date(rev.timestamp), "PPpp")}</StyledLenke>
          </Link>
        ))}
      </details>
    </Style>
  );
}

export default Revisions;
