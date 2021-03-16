import { createCurrentUserHook, createImageUrlBuilder, createClient } from "next-sanity";

export const sanityConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "rt6o382n",
  useCdn: process.env.NODE_ENV === "production",
};

export const urlFor = (source) => createImageUrlBuilder(sanityConfig).image(source);

export const sanityClient = createClient(sanityConfig);

const token = process.env.SANITY_READ_TOKEN;

export const previewClient = createClient({
  ...sanityConfig,
  useCdn: false,
  token,
});

export const getClient = (usePreview) => (usePreview ? previewClient : sanityClient);

export const useCurrentUser = createCurrentUserHook(sanityConfig);
