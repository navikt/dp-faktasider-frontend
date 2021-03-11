import React from "react";
import { WebPreviewWrapper } from "./PreviewWrapper";

const FaktasidePreview = (ctx: any) => {
  const slug = ctx.document.displayed?.slug?.current;

  if (!slug) {
    return <div>Faktasiden må ha en slug (url) før den kan forhåndsvises</div>;
  }

  const previewUrl = `/${slug}?preview=true`;

  const url =
    process.env.NODE_ENV === "production"
      ? `https://www.nav.no/arbeid${previewUrl}`
      : `http://localhost:3000/arbeid${previewUrl}`;

  return <WebPreviewWrapper url={url} />;
};

export default FaktasidePreview;
