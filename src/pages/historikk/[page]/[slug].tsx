import React from "react";
import { useRouter } from "next/router";
import { GetStaticPathsContext, GetStaticPropsContext } from "next";
import { sanityClient } from "../../../sanity/sanity-config";
import { historiskFaktasideQuery } from "../../../sanity/groq/historikk/faktasideQuery";

export default function Test({ posts }) {
  return (
    <>
      Ny histikk side
      <ul>
        {posts.map((post) => (
          <li key={post.title}>{post.title}</li>
        ))}
      </ul>
    </>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps(context: GetStaticPropsContext) {
  console.log(context.params);
  const posts = [];

  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths(context: GetStaticPathsContext) {
  const versions = await sanityClient.fetch(historiskFaktasideQuery);

  console.log(versions);

  // Get the paths we want to pre-render based on posts
  const paths = versions.map((version) => ({
    params: { id: version._id, slug: version.slug.current },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}
