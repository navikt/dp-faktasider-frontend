import { createGlobalStyle } from "styled-components";
import { useState } from "react";
import { useMount } from "react-use";
import * as React from "react";

const StickyFeedbackStyle = createGlobalStyle`
  .feedback-container {
      position: fixed;
      bottom: 0;
      background-color: white;
      z-index: 100;
      border-top: #c6c2bf 2px solid;
  }
`;

function StickyFeedback() {
  const [footerInViewport, setFooterInViewport] = useState(false);
  const [verySmallScreen, setVerySmallScreen] = useState(false);

  useMount(() => {
    const footer = document.getElementsByTagName("footer")[0];
    const handleScroll = () => setFooterInViewport(footer.getBoundingClientRect().top < window.innerHeight);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  useMount(() => setVerySmallScreen(window.innerHeight < 800));
  if (verySmallScreen || footerInViewport) return null;
  return <StickyFeedbackStyle />;
}

export default StickyFeedback;
