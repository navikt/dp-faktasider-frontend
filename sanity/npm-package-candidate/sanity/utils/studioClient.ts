import client from "part:@sanity/base/client";
import { SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const studioClient: SanityClient = client;

const builder = imageUrlBuilder(studioClient);

export function urlFor(source) {
  return builder.image(source);
}
