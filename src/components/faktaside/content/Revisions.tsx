import { format } from "date-fns";
import { useFaktasideContext } from "../FaktaSideContext";
import styled from "styled-components/macro";
import compareDesc from "date-fns/compareDesc";
import Utkast from "../../BlockContent/utkast/Utkast";
import Lenke from "nav-frontend-lenker";

const Style = styled.div``;

const StyledLenke = styled(Lenke)`
  display: block;
`;

// Denne lista er ikke komplett. Her regnes ikke delte tekster og notifikasjoner med feks, de kan være oppdatert uten at det vises her. Dersom en delt tekst som trekkes inn er oppdatert vil det være en endring ut mot bruker, så for at denne lista skal kunne brukes må det regnes inn på et vis.
function Revisions() {
  const faktaside = useFaktasideContext();

  const sortedRevisions = faktaside.revisions?.sort((a, b) =>
    compareDesc(new Date(a.timestamp), new Date(b.timestamp))
  );

  return (
    <Utkast>
      <Style>
        <details>
          <summary>Historikk</summary>
          {sortedRevisions?.map((rev) => (
            <StyledLenke key={rev.id} href={`historikk/${faktaside.id}?time=${rev.timestamp}`}>
              {format(new Date(rev.timestamp), "PPpp")}
            </StyledLenke>
          ))}
        </details>
      </Style>
    </Utkast>
  );
}

export default Revisions;
