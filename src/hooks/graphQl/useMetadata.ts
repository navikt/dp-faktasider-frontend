import { graphql, useStaticQuery } from "gatsby";

export interface Metadata {
  imagePath: string;
  siteUrl: string;
}

function useMetadata(): Metadata {
  const data = useStaticQuery(graphql`
    query SEO {
      site {
        siteMetadata {
          imagePath
          siteUrl
        }
      }
    }
  `);

  return data.site.siteMetadata;
}

export default useMetadata;
