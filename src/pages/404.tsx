import React from 'react';
import SEO from '../components/seo';
import styled from 'styled-components';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';

const Style = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
`;

const NotFoundPage = () => (
  <Style>
    <SEO title="404: Not found" />
    <Innholdstittel>Denne siden finnes ikke</Innholdstittel>
    <Normaltekst>Du har fulgt en url som ikke er i bruk.</Normaltekst>
  </Style>
);

export default NotFoundPage;
