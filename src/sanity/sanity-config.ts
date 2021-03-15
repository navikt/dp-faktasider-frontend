import {
  createCurrentUserHook,
  createImageUrlBuilder,
  createPortableTextComponent,
  createPreviewSubscriptionHook,
} from "next-sanity";
import createClient from "@sanity/client"; // klienten fra next-sanity støtter ikke webproxy, men det skal klienten fra @sanity/next gjøre
import { useMemo } from "react";

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "rt6o382n",
  useCdn: process.env.NODE_ENV === "production",
};

export const urlFor = (source) => createImageUrlBuilder(config).image(source);

export const usePreviewSubscription = (dataset?: string) => {
  return useMemo(() => createPreviewSubscriptionHook({ ...config, dataset: dataset || config.dataset }), [dataset]);
};

export const PortableText = createPortableTextComponent({
  ...config,
  serializers: {},
});

export const sanityClient = createClient(config);

const token = process.env.SANITY_READ_TOKEN;

export const previewClient = createClient({
  ...config,
  useCdn: false,
  token,
});

export const getClient = (usePreview) => (usePreview ? previewClient : sanityClient);

export const useCurrentUser = createCurrentUserHook(config);
