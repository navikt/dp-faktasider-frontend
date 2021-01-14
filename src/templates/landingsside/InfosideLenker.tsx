import { useTranslation } from "react-i18next";
import React from "react";
import { ForsideLenkePanel } from "./ForsideLenkePanel";
import { MenuItem } from "../../hooks/graphQl/menuDataUtils";
import { EksternLenke, InternLenke } from "./ForsideLenker";
import styled from "styled-components/macro";

const StyledForsideLenkePanel = styled(ForsideLenkePanel)`
  a {
    padding: 1rem 2rem;
    height: 100%;
  }
  margin: 2rem 0 4rem;
`;

const StyledLi = styled.li`
  background-color: white;
  min-height: 8rem;
`;

function InfosideLenker(props: { lenker: MenuItem[] }) {
  const { t } = useTranslation("global");

  return (
    <StyledForsideLenkePanel title={t("forsideInformasjonHeader")} hideTitle={true}>
      {props.lenker.map((lenke, index) => (
        <StyledLi key={index}>
          {lenke.type === "internal" ? (
            <InternLenke lenke={lenke} key={lenke.id} />
          ) : (
            <EksternLenke lenke={lenke} key={lenke.url} />
          )}
        </StyledLi>
      ))}
    </StyledForsideLenkePanel>
  );
}

export default InfosideLenker;
