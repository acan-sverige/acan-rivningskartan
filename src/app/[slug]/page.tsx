import { getDictionary } from "@/lib/dictionaries";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const dict = await getDictionary();
const ListPage = dynamic(() =>
  import("@/components/List/ListPage").then((mod) => mod.ListPage),
);
const MapPage = dynamic(() =>
  import("@/components/Map/MapPage").then((mod) => mod.MapPage),
);
const NotFound = dynamic(() => import("../not-found"));

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return [{ slug: dict.slugs.list }, { slug: dict.slugs.map }];
}

export default function SlugPage(props: { params: Params }) {
  // Read params inside Suspense so the route's shared App Shell doesn't depend on the URL
  return (
    <Suspense>
      <SlugContent params={props.params} />
    </Suspense>
  );
}

async function SlugContent({ params }: { params: Params }) {
  const { slug } = await params;
  switch (slug) {
    case dict.slugs.list:
      return <ListPage />;
    case dict.slugs.map:
      return <MapPage />;
    default:
      return <NotFound />;
  }
}
