import client from "part:@sanity/base/client";

export function getDataset() {
  return client.config().dataset;
}
