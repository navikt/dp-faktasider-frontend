import styled from 'styled-components/macro';
import { theme } from '../../styles/theme';

export const MainContentStyle = styled.main`
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
      margin-bottom: 1rem;
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
