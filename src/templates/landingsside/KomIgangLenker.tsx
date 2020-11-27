import { EksternLenkeI } from "../../hooks/graphQl/useProjectData";
import { useTranslation } from "react-i18next";
import React from "react";
import { ForsideLenkePanel } from "./ForsideLenkePanel";
import { EksternLenke } from "./ForsideLenker";
import styled from "styled-components";

const Style = styled.div`
  p {
    font-weight: 200 !important;
  }
`;

export function KomIgangLenker(props: { komIgangLenker?: EksternLenkeI[] }) {
  const { t } = useTranslation("global");

  if (!props.komIgangLenker?.length) {
    return null;
  }

  return (
    <Style>
      <ForsideLenkePanel title={t("forsideKomIgangHeader")}>
        {props.komIgangLenker?.map((lenke) => (
          <EksternLenke lenke={lenke} key={lenke.url} chevron={true} />
        ))}
      </ForsideLenkePanel>
    </Style>
  );
}
