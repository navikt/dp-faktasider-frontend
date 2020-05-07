import { useState } from 'react';
import { createGlobalStyle } from 'styled-components';

const SmoothScrollStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }
`;

function useSmoothscrollOnClick() {
  const [smoothScroll, setSmoothScroll] = useState(false);

  const activateSmoothScroll = () => {
    setSmoothScroll(true);
    setTimeout(() => setSmoothScroll(false), 1000);
  };

  return {
    activateSmoothScroll,
    SmoothScroll: smoothScroll ? SmoothScrollStyle : () => null,
  };
}

export default useSmoothscrollOnClick;
