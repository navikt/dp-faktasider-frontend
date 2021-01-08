import { createGlobalStyle } from "styled-components";
import { useState } from "react";
import { useMount, useSearchParam } from "react-use";
import * as React from "react";

const feedbackContainerClassName = "feedback-container";

const StickyFeedbackStyle = createGlobalStyle<{ feedbackHeight: number }>`
  .${feedbackContainerClassName} {
      position: fixed;
      bottom: 0;
      background-color: white;
      z-index: 100;
      border-top: #c6c2bf 2px solid;
  }
  #chatbot-frida-knapp {
    bottom: ${(props) => props.feedbackHeight - 30}px !important;
  }
`;

function StickyFeedback() {
  const [footerInViewport, setFooterInViewport] = useState(false);
  const [verySmallScreen, setVerySmallScreen] = useState(false);
  const [feedbackHeight, setFeedbackHeight] = useState(0);

  const date = new Date().getDate();
  const showStickyFeedback = useSearchParam("stickyFeedback") || (date >= 11 && date <= 17); // Viser stickyfooter i en uke for å se hvordan det slår ut på metrikkene at tilbakemeldingskomponenten vises tydligere https://confluence.adeo.no/x/-eiPFw

  useMount(() => {
    const footer = document.getElementsByTagName("footer")[0];
    const feedbackContainer = document.getElementsByClassName(feedbackContainerClassName)[0];
    const handleScroll = () => {
      setFooterInViewport(footer?.getBoundingClientRect().top < window.innerHeight);
      setFeedbackHeight(feedbackContainer?.getBoundingClientRect().height || 0);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  useMount(() => setVerySmallScreen(window.innerHeight < 650));
  if (!showStickyFeedback || verySmallScreen || footerInViewport) return null;
  return <StickyFeedbackStyle feedbackHeight={feedbackHeight} />;
}

export default StickyFeedback;
