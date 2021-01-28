import { useTranslation } from "react-i18next";
import React from "react";
import { EksternLenke, InternLenke } from "./ForsideLenker";
import styled from "styled-components/macro";
import { Undertittel } from "nav-frontend-typografi";
import useUniqueId from "../../utils/useUniqueId";
import { contentMaxwidth } from "./style";
import { MenuItem } from "../../sanity/groq/menu/menuDataUtils";

const StyledUl = styled.ul`
  margin: 2rem 0 4rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @supports (display: grid) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
    grid-gap: 1.5rem;
  }
`;

const StyledSection = styled.section`
  width: ${contentMaxwidth};
  max-width: 100vw;
`;

const StyledLi = styled.li`
  background-color: white;
  min-height: 8rem;
  flex: 15rem 0 0;
  a {
    padding: 1rem 2rem;
    height: 100%;
  }
`;

function InfosideLenker(props: { lenker: MenuItem[] }) {
  const { t } = useTranslation("global");
  const id = useUniqueId("lenkepanel");

  return (
    <StyledSection aria-labelledby={id}>
      <Undertittel className={"sr-only"} id={id}>
        {t("forsideInformasjonHeader")}
      </Undertittel>
      <StyledUl>
        {props.lenker.map((lenke, index) => (
          <StyledLi key={index}>
            {lenke.type === "internal" ? (
              <InternLenke lenke={lenke} key={lenke.id} />
            ) : (
              <EksternLenke lenke={lenke} key={lenke.url} />
            )}
          </StyledLi>
        ))}
      </StyledUl>
    </StyledSection>
  );
}

export default InfosideLenker;
