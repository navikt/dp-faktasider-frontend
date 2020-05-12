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
  ul {
    padding-left: 2rem;
    list-style: disc;
    margin: 1.5rem 0;
    li {
      margin-bottom: 0.5rem;
      line-height: 1.3;
    }
    ul {
      list-style: circle;
    }
  }
  ol {
    list-style: decimal;
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;
    li {
      margin: 0.5rem 0;
      line-height: 1.3;

      padding-left: 1rem;
    }
  }
  p {
    margin: 0.5rem 0 1rem;
  }
  h4 {
    text-align: center;
  }
`;

const Style = styled.div`
  display: flex;
  position: relative;
  align-items: flex-start;
`;

function Layout(props: Props) {
  return (
    <div>
      <Header heading={props.header} />
      <Style>
        <OtherPagesMenu />
        <ContentStyle>
          <InnholdsMeny menuItems={props.menuItems} />
          <StyledMain>{props.children}</StyledMain>
        </ContentStyle>
      </Style>
    </div>
  );
}

export default Layout;
