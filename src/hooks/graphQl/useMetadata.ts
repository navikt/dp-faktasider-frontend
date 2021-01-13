export interface Metadata {
  imagePath: string;
  siteUrl: string;
}

function useMetadata(): Metadata {
  // TODO: Sett riktige verdier
  return { imagePath: "", siteUrl: "https://www.nav.no/arbeid" };
}

export default useMetadata;
