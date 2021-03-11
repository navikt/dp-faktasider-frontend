import React from "react";
import { WebPreviewWrapper } from "./PreviewWrapper";

const DemoappPreview = () => {
  const previewUrl = `/demoapp`;

  const url =
    process.env.NODE_ENV === "production"
      ? `https://www.nav.no/arbeid${previewUrl}`
      : `http://localhost:3000/arbeid${previewUrl}`;

  return <WebPreviewWrapper url={url} />;
};

export default DemoappPreview;
