import { EksternLenkeI } from "../../hooks/graphQl/useProjectData";
import { useTranslation } from "react-i18next";
import React from "react";
import { ForsideLenkePanel } from "./ForsideLenkePanel";
import { EksternLenke } from "./ForsideLenker";
import styled from "styled-components";

const Style = styled.div`
  background-color: white;
  padding: 3rem 0 4rem;
  display: flex;
  justify-content: center;
`;

const StyledForsideLenkePanel = styled(ForsideLenkePanel)`
  margin: 0 1rem;
`;

export function Snarveier(props: { snarveier?: EksternLenkeI[] }) {
  const { t } = useTranslation("global");

  if (!props.snarveier?.length) {
    return null;
  }

  return (
    <Style>
      <StyledForsideLenkePanel title={t("forsideKomIgangHeader")}>
        {props.snarveier?.map((lenke) => (
          <li key={lenke.url}>
            <EksternLenke lenke={lenke} chevron={true} />
          </li>
        ))}
      </StyledForsideLenkePanel>
    </Style>
  );
}
