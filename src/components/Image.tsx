import Img from "next/image";
import { ComponentProps, FC } from "react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlForImage } from "../../sanity/lib/image";

type ImageProps = {
  image: SanityImageSource;
} & Omit<ComponentProps<typeof Img>, "src">;

export const Image: FC<ImageProps> = ({ image, ...props }) => {
  return <Img src={urlForImage(image).url()} {...props} />;
};
