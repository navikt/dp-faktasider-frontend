export interface Metadata {
  imagePath: string;
  siteUrl: string;
}

function useMetadata(): Metadata {
  // @ts-ignore
  return data.site.siteMetadata;
}

export default useMetadata;
