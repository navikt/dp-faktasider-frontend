import { createImageUrlBuilder, createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "rt6o382n";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const sanityConfig = {
  dataset: dataset,
  projectId: projectId,
  useCdn: process.env.NODE_ENV === "production",
  apiVersion: "2021-06-06",
};

export const urlFor = (source) => createImageUrlBuilder(sanityConfig).image(source);

export const sanityClient = createClient(sanityConfig);
