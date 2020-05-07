import * as React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components/macro';
import { theme } from '../../styles/theme';
import OtherPagesMenu from './OtherPagesMenu';
import Header from '../felles/Header';
import InnholdsMeny from './InnholdsMeny/InnholdsMeny';

interface Props {
  header: string;
  children: ReactNode;
  menuItems: string[];
}

const ContentStyle = styled.div`
  flex-grow: 1;
  position: relative;
  min-height: 70vh;
  padding: 3.5rem 0;
  display: flex;
  align-items: stretch;
  justify-content: center;
`;

const StyledMain = styled.main`
  flex: 0 1 40rem;
  max-width: 40rem;
  @media (${theme.media.bigScreen}) {
    margin-left: ${theme.layoutMargin};
  }
`;

const Style = styled.div`
  display: flex;
  position: relative;
  align-items: flex-start;
`;

function Layout(props: Props) {
  return (
    <>
      <Header heading={props.header} />
      <Style>
        <OtherPagesMenu />
        <ContentStyle>
          <InnholdsMeny menuItems={props.menuItems} />
          <StyledMain>{props.children}</StyledMain>
        </ContentStyle>
      </Style>
    </>
  );
}

export default Layout;
