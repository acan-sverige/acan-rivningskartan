import { toFeature } from "@/lib/toFeature";
import type { FC } from "react";
import { useCallback, useState } from "react";
import type { ViewStateChangeEvent } from "react-map-gl/maplibre";
import ReactMapGl, { Source, Layer } from "react-map-gl/maplibre";
import { UNCLUSTERED_LAYER_STYLE } from "./Map/layers";
import type { FeatureCollection } from "geojson";
import { mapStyle } from "./Map/style";

// Include style sheets
import "maplibre-gl/dist/maplibre-gl.css";

export const DetailsMap: FC<{ building: FeatureBuilding }> = ({ building }) => {
  const [viewState, setViewState] = useState({
    latitude: building.location.lat,
    longitude: building.location.lng,
    zoom: 17,
    // pitch: 35,
  });
  const features: FeatureCollection = {
    type: "FeatureCollection",
    features: [toFeature(building)],
  };

  const handleInteraction = useCallback(
    (e: ViewStateChangeEvent) =>
      setViewState({
        ...e.viewState,
        latitude: building.location.lat,
        longitude: building.location.lng,
      }),
    [building],
  );

  return (
    <ReactMapGl
      mapLib={import("maplibre-gl")}
      mapStyle={mapStyle}
      {...viewState}
      onZoom={handleInteraction}
      onRotate={handleInteraction}
    >
      <Source id="annotations" type="geojson" data={features}>
        <Layer {...UNCLUSTERED_LAYER_STYLE} />
      </Source>
    </ReactMapGl>
  );
};
