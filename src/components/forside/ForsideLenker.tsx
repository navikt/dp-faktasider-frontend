import styled from "styled-components/macro";
import { Normaltekst } from "nav-frontend-typografi";
import { InternalMenuLinkData } from "../../hooks/graphQl/menuDataUtils";
import { useTranslation } from "react-i18next";
import Utkast from "../../components/BlockContent/utkast/Utkast";
import { EksternLenkeI } from "../../hooks/graphQl/fetchProjectData";
import React, { useRef } from "react";
import { guid } from "nav-frontend-js-utils";
import { HoyreChevron } from "nav-frontend-chevron";
import Link from "next/link";

const StyledChevron = styled(HoyreChevron)`
  margin-right: 0.75rem;
  transition: 0.3s;
  position: relative;
  left: 0;
`;

const ForsideLenkeHeader = styled(Normaltekst).attrs({ className: "lenke" })`
  font-size: 1.2rem !important;
  text-decoration: none !important;
  margin-bottom: 0.75rem !important;
  display: inline-flex;
  align-items: center;

  &:hover {
    ${StyledChevron} {
      left: 0.5rem;
    }
  }
`;

export const LenkeStyle = styled.a`
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

const KunTilgjengeligStyle = styled.p`
  opacity: 0.7;
  margin: 0.3rem 0 !important;
`;

export function InternLenke(props: { lenke: InternalMenuLinkData }) {
  const { t } = useTranslation("global");
  const langAttribute = !props.lenke.tilgjengeligPåValgtSpråk ? props.lenke.språk : undefined;
  const id = useRef(guid()).current;

  return (
    <Link href={props.lenke.path}>
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

export function EksternLenke(props: { lenke: EksternLenkeI; chevron?: boolean }) {
  const id = useRef(guid()).current;

  return (
    <LenkeStyle aria-labelledby={id} href={props.lenke.url}>
      <ForsideLenkeHeader id={id}>
        {props.chevron && <StyledChevron />}
        <span>{props.lenke.tittel}</span>
      </ForsideLenkeHeader>
      <p>{props.lenke.beskrivelse}</p>
    </LenkeStyle>
  );
}
