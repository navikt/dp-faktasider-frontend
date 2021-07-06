import styled from "styled-components";
import React from "react";

const Style = styled.div`
  iframe {
    height: 100%;
    width: 100%;
  }
  background-color: white;
  height: calc(100% - 2rem);
  margin: 1rem;
  box-shadow: 0 0 1rem #888;
`;

export function WebPreviewWrapper(props: { path: string }) {
  const url =
    process.env.NODE_ENV === "production"
      ? `https://www.nav.no/arbeid${props.path}`
      : `http://localhost:3000/arbeid${props.path}`;

  return (
    <Style>
      <iframe src={url} frameBorder={0} />
    </Style>
  );
}
