import * as React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const GraaBoks = styled.div`
  padding: 2vmin;
  background-color: ${theme.colors.navLysGra};
  border-radius: ${theme.borderRadius};
  ul {
    list-style: none !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  li {
    margin: 1rem;
    position: relative;
    padding-left: 1rem;
    &::before {
      content: '';
      display: block;
      height: 0.5rem;
      width: 0.5rem;
      border-radius: 50%;
      background-color: ${theme.colors.navGra40};
      position: absolute;
      left: -0.5rem;
      top: 0.4rem;
    }
  }
`;

export default GraaBoks;
