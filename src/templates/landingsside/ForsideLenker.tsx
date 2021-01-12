import styled, { css } from "styled-components/macro";
import { Normaltekst } from "nav-frontend-typografi";
import { InternalMenuLinkData } from "../../hooks/graphQl/menuDataUtils";
import { useTranslation } from "react-i18next";
import Utkast from "../../components/BlockContent/utkast/Utkast";
import { EksternLenkeI } from "../../hooks/graphQl/fetchProjectData";
import React, { useRef } from "react";
import { guid } from "nav-frontend-js-utils";
import { HoyreChevron } from "nav-frontend-chevron";

const StyledChevron = styled(HoyreChevron)`
  margin-right: 0.75rem;
  transition: 0.3s;
  position: relative;
  left: 0;
`;

const ForsideLenkeHeader = styled(Normaltekst).attrs({ className: "lenke" })`
  font-size: 1.2rem;
  text-decoration: none;
  margin-bottom: 0.75rem;
  display: inline-flex;
  align-items: center;
  &:hover {
    ${StyledChevron} {
      left: 0.5rem;
    }
  }
`;

export const lenkeStyling = css`
  border-radius: 0.5rem;
  display: block;
  text-decoration: none;
  color: inherit;
  &:hover {
    ${ForsideLenkeHeader} {
      text-decoration: underline;
    }
  }
`;

export const EksternLenkeStyle = styled.a`
  ${lenkeStyling};
`;

// @ts-ignore
const InternLenkeStyle = styled(Link)`
  ${lenkeStyling};
`;

const KunTilgjengeligStyle = styled.p`
  opacity: 0.7;
  margin: 0.3rem 0 !important;
`;

export function InternLenke(props: { lenke: InternalMenuLinkData }) {
  const { t } = useTranslation("global");
  const langAttribute = !props.lenke.tilgjengeligPåValgtSpråk ? props.lenke.språk : undefined;
  const id = useRef(guid()).current;

  return (
    <InternLenkeStyle aria-labelledby={id} to={props.lenke.path} lang={langAttribute}>
      <ForsideLenkeHeader id={id}>{props.lenke.tittel}</ForsideLenkeHeader>
      {!props.lenke.tilgjengeligPåValgtSpråk && (
        <Utkast>
          <KunTilgjengeligStyle>
            {t("kunTilgjengeligPå")} {t(props.lenke.språk)}
          </KunTilgjengeligStyle>
        </Utkast>
      )}
      <p lang={langAttribute}>{props.lenke.nokkelordBeskrivelse || props.lenke.beskrivelse}</p>
    </InternLenkeStyle>
  );
}

export function EksternLenke(props: { lenke: EksternLenkeI; chevron?: boolean }) {
  const id = useRef(guid()).current;

  return (
    <EksternLenkeStyle aria-labelledby={id} href={props.lenke.url}>
      <ForsideLenkeHeader id={id}>
        {props.chevron && <StyledChevron />}
        <span>{props.lenke.tittel}</span>
      </ForsideLenkeHeader>
      <p>{props.lenke.beskrivelse}</p>
    </EksternLenkeStyle>
  );
}
