import { useTranslation } from "react-i18next";
import React from "react";
import styled from "styled-components";
import { Undertittel } from "nav-frontend-typografi";
import { contentMaxwidth } from "./style";
import useUniqueId from "../../utils/useUniqueId";
import { Snarvei } from "../../sanity/groq/forside/forsideQuery";
import { HoyreChevron } from "nav-frontend-chevron";

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

const StyledChevron = styled(HoyreChevron)`
  margin-right: 0.75rem;
  transition: 0.3s !important;
  position: relative;
  left: 0;
`;

export const LenkeStyle = styled.a.attrs({ className: "lenke" })`
  border-radius: 0.5rem;
  text-decoration: none !important;
  font-size: 1.2rem !important;
  margin-bottom: 0.75rem !important;
  display: inline-flex;
  align-items: center;

  &:hover {
    text-decoration: underline !important;
    ${StyledChevron} {
      left: 0.5rem;
    }
  }
`;

export function Snarveier(props: { snarveier?: Snarvei[] }) {
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
              <LenkeStyle href={lenke.url}>
                <StyledChevron />
                <span>{lenke.tittel}</span>
              </LenkeStyle>
            </li>
          ))}
        </StyledUl>
      </Style>
    </Wrapper>
  );
}
