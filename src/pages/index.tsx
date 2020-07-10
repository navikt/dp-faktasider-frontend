import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import Header from '../templates/felles/Header';
import useFaktasiderSumary, { FaktasideSummary } from '../utils/faktasiderSummary/useFaktasiderSumary';
import localizeSanityContent from '../i18n/localizeSanityContent';
import { useLocale } from '../i18n/LocaleContext';
import { useTranslation } from 'react-i18next';
import { Translations } from '../types/translations';

const StyledElement = styled.div`
  background-color: white;
  padding: 1.2rem 1.2rem 2rem;
  border-radius: 0.5rem;
`;

const Style = styled.div`
  max-width: 50rem;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2rem 0;
  ${StyledElement} {
    flex: 15rem 1;
    margin: 0.5rem;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const KunTilgjengeligStyle = styled.p`
  text-align: center;
  opacity: 0.7;
  margin: 1rem 0 !important;
`;

const IndexPage = () => {
  const projectData = useStaticQuery(
    graphql`
      query Oppsett {
        oppsett: sanityOppsett {
          title: _rawTitle
        }
      }
    `
  );
  const sider = useFaktasiderSumary();

  return <PureIndexPage projectData={projectData} sider={sider} />;
};

interface Props {
  projectData: {
    oppsett: {
      title: Translations<string>;
    };
  };
  sider: FaktasideSummary[];
}

export function PureIndexPage(props: Props) {
  const lang = useLocale();
  const { t } = useTranslation('global');

  return (
    <>
      <Header heading={localizeSanityContent(props.projectData.oppsett.title, lang)} ingress="" />
      <Style>
        {props.sider.map((side) => (
          <StyledElement key={side.id}>
            <StyledLink to={side.path}>{side.tittel}</StyledLink>
            {!side.tilgjengeligPåValgtSpråk && (
              <KunTilgjengeligStyle>
                ({t('kunTilgjengeligPå')} {t(side.språk)})
              </KunTilgjengeligStyle>
            )}
            <p>{side.ingress}</p>
          </StyledElement>
        ))}
      </Style>
    </>
  );
}

export default IndexPage;
