"use client";

import { SanityDocument } from "next-sanity";
import { FC } from "react";
import { useLiveQuery } from "@sanity/preview-kit";
import { ManifestPageContent } from "./ManifestPageContent";

export const PreviewManifestPageContent: FC<{
  data: SanityDocument<ManifestDocumentType>;
  query: string;
  dict: Dictionary;
}> = ({ data, query, dict }) => {
  const [liveData] = useLiveQuery(data, query);

  return <ManifestPageContent data={liveData} dict={dict} />;
};
