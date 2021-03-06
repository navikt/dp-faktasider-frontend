import { useTranslation } from "react-i18next";
import React, { useRef } from "react";
import styled from "styled-components/macro";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import useUniqueId from "../../utils/useUniqueId";
import { contentMaxwidth } from "./style";
import Utkast from "../BlockContent/utkast/Utkast";
import { MenylenkeEkstern } from "../../sanity/groq/menu/menuQuery";
import { guid } from "nav-frontend-js-utils";
import Link from "next/link";
import { MenuItem, MenylenkeInternParsed } from "../../sanity/groq/menu/parseMenuData";

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
`;

const ForsideLenkeHeader = styled(Normaltekst).attrs({ className: "lenke" })`
  font-size: 1.2rem !important;
  text-decoration: none !important;
  margin-bottom: 0.75rem !important;
`;

export const LenkeStyle = styled.a`
  display: block;
  text-decoration: none;
  color: inherit;
  padding: 1rem 2rem;
  height: 100%;

  &:hover {
    ${ForsideLenkeHeader} {
      text-decoration: underline !important;
    }
  }
`;

const KunTilgjengeligStyle = styled.p`
  opacity: 0.7;
  margin: 0.3rem 0 !important;
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
            {lenke._type === "menylenkeIntern" ? (
              <InternLenke lenke={lenke} key={lenke.pageId} />
            ) : (
              <EksternLenke lenke={lenke} key={lenke.url} />
            )}
          </StyledLi>
        ))}
      </StyledUl>
    </StyledSection>
  );
}

export function InternLenke(props: { lenke: MenylenkeInternParsed }) {
  const { t } = useTranslation("global");
  const langAttribute = !props.lenke.tilgjengeligPåValgtSpråk ? props.lenke.språk : undefined;
  const id = useRef(guid()).current;

  return (
    <Link href={props.lenke.path} locale={props.lenke.språk} passHref>
      <LenkeStyle aria-labelledby={id} lang={langAttribute}>
        <ForsideLenkeHeader id={id}>{props.lenke.tittel}</ForsideLenkeHeader>
        {!props.lenke.tilgjengeligPåValgtSpråk && (
          <Utkast>
            <KunTilgjengeligStyle>
              {t("kunTilgjengeligPå")} {t(props.lenke.språk)}
            </KunTilgjengeligStyle>
          </Utkast>
        )}
        <p lang={langAttribute}>{props.lenke.nokkelordBeskrivelse || props.lenke.beskrivelse}</p>
      </LenkeStyle>
    </Link>
  );
}

export function EksternLenke(props: { lenke: MenylenkeEkstern; chevron?: boolean }) {
  const id = useRef(guid()).current;

  return (
    <LenkeStyle aria-labelledby={id} href={props.lenke.url}>
      <ForsideLenkeHeader id={id}>{props.lenke.tittel}</ForsideLenkeHeader>
      <p>{props.lenke.beskrivelse}</p>
    </LenkeStyle>
  );
}

export default InfosideLenker;
