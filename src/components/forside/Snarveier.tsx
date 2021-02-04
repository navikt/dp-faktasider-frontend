import { useTranslation } from "react-i18next";
import React from "react";
import { EksternLenke } from "./ForsideLenker";
import styled from "styled-components";
import { Undertittel } from "nav-frontend-typografi";
import { contentMaxwidth } from "./style";
import useUniqueId from "../../utils/useUniqueId";
import { EksternLenkeI } from "../../sanity/groq/forside/parseForsideData";

const Wrapper = styled.div`
  background-color: white;
  padding: 3rem 0 4rem;
  display: flex;
  justify-content: center;
`;

const Style = styled.section`
  width: ${contentMaxwidth};
  max-width: 100vw;
`;

const StyledUndertittel = styled(Undertittel)`
  margin-bottom: 2rem !important;
`;

const StyledUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  li {
    flex: 15rem 0 0;
  }
  @supports (display: grid) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
    grid-gap: 1.5rem;
  }
`;

export function Snarveier(props: { snarveier?: EksternLenkeI[] }) {
  const { t } = useTranslation("global");
  const id = useUniqueId("snartveier");

  if (!props.snarveier?.length) {
    return null;
  }

  return (
    <Wrapper>
      <Style aria-labelledby={id}>
        <StyledUndertittel id={id}>{t("forsideKomIgangHeader")}</StyledUndertittel>
        <StyledUl>
          {props.snarveier?.map((lenke) => (
            <li key={lenke.url}>
              <EksternLenke lenke={lenke} chevron={true} />
            </li>
          ))}
        </StyledUl>
      </Style>
    </Wrapper>
  );
}
