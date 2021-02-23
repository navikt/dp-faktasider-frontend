import React from "react";
import { groq } from "next-sanity";
import { sanityClient } from "../sanity/sanity-config";

const basePath = "/arbeid";

const generateSitemap = (paths: string[]): string => {
  const urls = paths
    .map(
      (path) => `
              <url>
                  <loc>${`https://www.nav.no${basePath}${path}`}</loc>
              </url>
          `
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls}
    </urlset>
    `;
};

const pagesQuery = groq`*[_type == "faktaSide"][]{
  "slug": slug.current,
  visSprakversjon
}`;

interface Page {
  slug: string;
  visSprakversjon: {
    no?: boolean;
    en?: boolean;
  };
}

class Sitemap extends React.Component {
  static getInitialProps = async (ctx) => {
    const pages: Page[] = await sanityClient.fetch(pagesQuery);

    const norskeSider = pages.filter((page) => page.visSprakversjon.no);
    const engelskeSider = pages.filter((page) => page.visSprakversjon.en);

    const paths = [
      "", // index-side
      "/en", // index-side
      ...norskeSider.map((page) => `/${page.slug}`),
      ...engelskeSider.map((page) => `/en/${page.slug}`),
    ];

    ctx.res.setHeader("Content-Type", "text/xml");
    ctx.res.write(generateSitemap(paths));
    ctx.res.end();
  };
}

export default Sitemap;
