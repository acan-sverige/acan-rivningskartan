import "server-only";
import type { QueryParams } from "@sanity/client";
import { cacheLife, cacheTag } from "next/cache";
import { draftMode } from "next/headers";
import { client } from "../../sanity/lib/client";

const DEFAULT_PARAMS = {} as QueryParams;
const DEFAULT_TAGS = [] as string[];

export const readToken = process.env.SANITY_READ_TOKEN;

export async function sanityFetch<QueryResponse>({
  query,
  params = DEFAULT_PARAMS,
  tags = DEFAULT_TAGS,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}): Promise<QueryResponse> {
  // Draft content is fetched uncached, outside of any "use cache" scope
  const isDraftMode = (await draftMode()).isEnabled;
  if (isDraftMode) {
    if (!readToken) {
      throw new Error(
        "The `SANITY_READ_TOKEN` environment variable is required.",
      );
    }
    return client
      .withConfig({ useCdn: false })
      .fetch<QueryResponse>(query, params, {
        token: readToken,
        perspective: "drafts",
      });
  }

  return fetchPublished<QueryResponse>(query, params, tags);
}

async function fetchPublished<QueryResponse>(
  query: string,
  params: QueryParams,
  tags: string[],
): Promise<QueryResponse> {
  "use cache";
  // Content updates are pushed by the Sanity webhook (api/revalidate), which
  // revalidates these tags
  cacheLife("max");
  cacheTag(...tags);

  return client
    .withConfig({ useCdn: true })
    .fetch<QueryResponse>(query, params);
}
