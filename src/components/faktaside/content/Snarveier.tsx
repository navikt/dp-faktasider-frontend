import * as React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components/macro";
import { theme } from "../../../styles/theme";
import H2Section from "../../Section/H2Section";
import withErrorBoundary from "../../../components/withErrorBoundary";
import { Snarvei } from "../../../sanity/groq/forside/forsideQuery";
import { idFromString } from "../../../utils/idFromString";
import { Link } from "@navikt/ds-react";

interface Props {
  snarveier?: Snarvei[];
}

const Style = styled.div`
  ul {
    list-style: none;

    li {
      margin-top: 0;
    }

    @media (${theme.media.bigScreen}) {
      column-count: 2;
    }
  }
`;

function Snarveier(props: Props) {
  const { t } = useTranslation("global");

  const snarveier = props.snarveier || [];
  if (!snarveier.length) {
    return null;
  }

  const title = t("snarveier");

  return (
    <Style>
      <H2Section title={title} id={idFromString(title)}>
        <ul>
          {snarveier.map((snarvei, i) => (
            <li key={i}>
              <Link href={snarvei.url}>{snarvei.tittel}</Link>
            </li>
          ))}
        </ul>
      </H2Section>
    </Style>
  );
}

export default withErrorBoundary(Snarveier, "Snarveier");
