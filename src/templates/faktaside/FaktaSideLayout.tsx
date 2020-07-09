import * as React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components/macro';
import Navigasjonsmeny from './Navigasjonsmeny/Navigasjonsmeny';
import Header from '../felles/Header';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import DevKnapper from '../../components/DevKnapper/DevKnapper';
import { MainContentStyle } from './MainContentStyle';
import withErrorBoundary from '../../components/withErrorBoundary';

interface Props {
  header: string;
  ingress: string;
  children: ReactNode;
}

const ContentStyle = styled.div`
  flex-grow: 1;
  position: relative;
  min-height: 30vh;
  display: flex;
  align-items: flex-start;
  > *:last-child {
    flex-grow: 1;
    margin: auto;
  }
`;

const Style = styled.div`
  display: flex;
  position: relative;
  align-items: flex-start;
`;

function FaktaSideLayout(props: Props) {
  return (
    <>
      <LanguageSelector />
      <Header heading={props.header} ingress={props.ingress} />
      <Style>
        <DevKnapper />
        <ContentStyle>
          <Navigasjonsmeny />
          <MainContentStyle>{props.children}</MainContentStyle>
        </ContentStyle>
      </Style>
    </>
  );
}

export default withErrorBoundary(FaktaSideLayout);
