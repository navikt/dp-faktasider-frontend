import { useTranslation } from 'react-i18next';
import React from 'react';
import styled from 'styled-components/macro';
import { EksternLenke, ForsideLenkePanel, lenkeStyling, StyledListElement } from './commonStyles';
import { Link } from 'gatsby';
import { InternalMenuLinkData, MenuItem } from '../../hooks/graphQl/menuDataUtils';
import Utkast from '../../components/BlockContent/utkast/Utkast';

const InfosideLenkeStyle = styled(Link).attrs({ className: 'lenke' })`
  ${lenkeStyling};
`;

const KunTilgjengeligStyle = styled.p`
  opacity: 0.7;
  margin: 0.3rem 0 !important;
`;

function InternLenke(props: { lenke: InternalMenuLinkData }) {
  const { t } = useTranslation('global');
  const langAttribute = !props.lenke.tilgjengeligPåValgtSpråk ? props.lenke.språk : undefined;

  return (
    <StyledListElement key={props.lenke.id}>
      <InfosideLenkeStyle to={props.lenke.path} lang={langAttribute}>
        {props.lenke.tittel}
      </InfosideLenkeStyle>
      {!props.lenke.tilgjengeligPåValgtSpråk && (
        <Utkast>
          <KunTilgjengeligStyle>
            {t('kunTilgjengeligPå')} {t(props.lenke.språk)}
          </KunTilgjengeligStyle>
        </Utkast>
      )}
      <p lang={langAttribute}>{props.lenke.beskrivelse}</p>
    </StyledListElement>
  );
}

function InfosideLenker(props: { lenker: MenuItem[] }) {
  const { t } = useTranslation('global');

  return (
    <ForsideLenkePanel title={t('forsideInformasjonHeader')} hideTitle={true}>
      {props.lenker.map((lenke) =>
        lenke.type === 'internal' ? (
          <InternLenke lenke={lenke} key={lenke.id} />
        ) : (
          <EksternLenke lenke={lenke} key={lenke.url} />
        )
      )}
    </ForsideLenkePanel>
  );
}

export default InfosideLenker;
