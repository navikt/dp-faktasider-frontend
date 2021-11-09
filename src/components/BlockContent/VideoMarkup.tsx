import React from "react";
import styled from "styled-components/macro";

interface Props {
  node: {
    title: string;
    url: string;
  };
}

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #bbb;
`;

const VideoContainer = styled.div`
  margin: 2rem 0;
  padding-bottom: 57.25%;
  position: relative;
`;

export function Video(props: Props) {
  return (
    <VideoContainer>
      <StyledIframe src={props.node.url} allowFullScreen frameBorder="0"></StyledIframe>
    </VideoContainer>
  );
}
