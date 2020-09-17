import styled, { css } from 'styled-components/macro';
import { theme } from '../../styles/theme';

export const typografiStyle = css`
  ul,
  ol {
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;
    li {
      margin: 0.7rem 0;
      padding-left: 0.3rem;
    }
  }
  ul {
    list-style: disc;
    ul {
      list-style: circle;
    }
  }
  ol {
    list-style: decimal;
  }

  p {
    margin: 0.5rem 0 1rem;
  }
`;

export const MainContentStyle = styled.main`
  flex: 0 1 40rem;
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 40rem;

  padding: 0 1rem;
  @media (${theme.media.smallScreen}) {
    padding: 0;
  }

  ${typografiStyle}
`;
