import { Studio } from "./Studio";
// Set the right `viewport`, `robots` and `referer` meta tags
export { metadata, viewport } from "next-sanity/studio";

// Ensures the Studio route is statically generated
export const dynamic = "force-static";

export default function StudioPage() {
  return <Studio />;
}
