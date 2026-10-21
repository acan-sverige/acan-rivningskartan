import type { Image as SanityImage } from "sanity";
import { urlForImage } from "../../../sanity/lib/image";

export const Image = ({ value }: { value: SanityImage }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={urlForImage(value).url()} alt="" className="w-full" />
);
