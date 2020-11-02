import styled, { css } from 'styled-components/macro';
import { Link } from 'gatsby';
import { Ingress } from 'nav-frontend-typografi';
import { InternalMenuLinkData } from '../../hooks/graphQl/menuDataUtils';
import { useTranslation } from 'react-i18next';
import Utkast from '../../components/BlockContent/utkast/Utkast';
import { EksternLenkeI } from '../../hooks/graphQl/useProjectData';
import React from 'react';

const ForsideLenkeHeader = styled(Ingress).attrs({ className: 'lenke' })`
  text-decoration: none;
`;

export const lenkeStyling = css`
  padding: 0.5rem;
  border-radius: 0.5rem;
  min-height: 8rem;
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

const InternLenkeStyle = styled(Link)`
  ${lenkeStyling};
`;

const KunTilgjengeligStyle = styled.p`
  opacity: 0.7;
  margin: 0.3rem 0 !important;
`;

export function InternLenke(props: { lenke: InternalMenuLinkData }) {
  const { t } = useTranslation('global');
  const langAttribute = !props.lenke.tilgjengeligPåValgtSpråk ? props.lenke.språk : undefined;

  return (
    <li key={props.lenke.id}>
      <InternLenkeStyle to={props.lenke.path} lang={langAttribute}>
        <ForsideLenkeHeader>{props.lenke.tittel}</ForsideLenkeHeader>
        {!props.lenke.tilgjengeligPåValgtSpråk && (
          <Utkast>
            <KunTilgjengeligStyle>
              {t('kunTilgjengeligPå')} {t(props.lenke.språk)}
            </KunTilgjengeligStyle>
          </Utkast>
        )}
        <p lang={langAttribute}>{props.lenke.beskrivelse}</p>
      </InternLenkeStyle>
    </li>
  );
}

export function EksternLenke(props: { lenke: EksternLenkeI }) {
  return (
    <li key={props.lenke.tittel}>
      <EksternLenkeStyle href={props.lenke.url}>
        <ForsideLenkeHeader>{props.lenke.tittel}</ForsideLenkeHeader>
        <p>{props.lenke.beskrivelse}</p>
      </EksternLenkeStyle>
    </li>
  );
}
