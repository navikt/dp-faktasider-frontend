import { createGlobalStyle } from "styled-components";
import { useState } from "react";
import { useMount, useSearchParam } from "react-use";
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

  const date = new Date().getDate();
  const showStickyFeedback = useSearchParam("stickyFeedback") || (date >= 11 && date <= 17); // Viser stickyfooter i en uke for å se hvordan det slår ut på metrikkene at tilbakemeldingskomponenten vises tydligere https://confluence.adeo.no/x/-eiPFw

  useMount(() => {
    const footer = document.getElementsByTagName("footer")[0];
    const handleScroll = () => setFooterInViewport(footer.getBoundingClientRect().top < window.innerHeight);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  useMount(() => setVerySmallScreen(window.innerHeight < 650));
  if (!showStickyFeedback || verySmallScreen || footerInViewport) return null;
  return <StickyFeedbackStyle />;
}

export default StickyFeedback;
