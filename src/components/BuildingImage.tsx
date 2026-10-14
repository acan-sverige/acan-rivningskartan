"use client";
import classNames from "clsx";
import { ComponentProps, FC } from "react";
import { Image } from "./Image";

export const BuildingImage: FC<
  Pick<FeatureBuilding, "images" | "state"> &
    Pick<ComponentProps<typeof Image>, "sizes">
  > = ({ images, state, sizes }) => {
    const firstValidImage = images?.find(img => img?.asset?.metadata?.dimensions?.width > 0);

    return <div className="w-full">{firstValidImage ? (
      <Image
        image={firstValidImage}
        className={classNames(
          "aspect-square h-auto w-full object-contain object-bottom",
          state === "riven" && "grayscale",
        )}
        loading="lazy"
        alt=""
        width={firstValidImage.asset.metadata.dimensions.width}
        height={firstValidImage.asset.metadata.dimensions.height}
        sizes={sizes}
      />
    ) : (
      <div className="aspect-square bg-acan-blue" />
    )}
  </div>
}
