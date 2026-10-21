import type { FC, MouseEventHandler } from "react";
import { useCallback, useRef } from "react";
import { Stack, Button, Text } from "@sanity/ui";
import { PatchEvent, set } from "sanity";
import type { MapLayerMouseEvent, MapRef } from "react-map-gl/maplibre";
import ReactMapGl, { Marker, AttributionControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { mapStyle } from "@/components/Map/style";

interface MapInputProps {
  value: { _type: "geopoint"; lat: number; lng: number };
  readOnly: boolean;
  onChange: (e: PatchEvent) => unknown;
}

export const MapInput: FC<MapInputProps> = ({ value, readOnly, onChange }) => {
  const mapRef = useRef<MapRef>(null);

  const handleMapClick = useCallback(
    (e: MapLayerMouseEvent) => {
      const patch = set({
        _type: "geopoint",
        lat: e.lngLat.lat,
        lng: e.lngLat.lng,
      });
      onChange(PatchEvent.from(patch));
    },
    [onChange],
  );
  const handleCenterMapClick: MouseEventHandler = useCallback(() => {
    if (!value) return;
    mapRef.current?.flyTo({ center: value, zoom: 15 });
  }, [value]);

  const hasValue =
    value && typeof value.lat === "number" && typeof value.lng === "number";

  return (
    <Stack gap={2}>
      <div style={{ aspectRatio: 3 / 2, backgroundColor: "lightgrey" }}>
        <ReactMapGl
          mapLib={import("maplibre-gl")}
          mapStyle={mapStyle}
          initialViewState={
            hasValue
              ? { latitude: value.lat, longitude: value.lng, zoom: 15 }
              : { bounds: [10, 55, 25, 69] }
          }
          attributionControl={false}
          onClick={readOnly ? undefined : handleMapClick}
          ref={mapRef}
        >
          {hasValue && (
            <Marker latitude={value.lat} longitude={value.lng} color="black" />
          )}
          <AttributionControl position="bottom-right" compact />
        </ReactMapGl>
      </div>
      <div className="flex items-center gap-2">
        <Text>
          {hasValue ? (
            <>
              ({value.lat}, {value.lng})
            </>
          ) : (
            "(-, -)"
          )}
        </Text>
        <Button
          onClick={handleCenterMapClick}
          mode="ghost"
          disabled={!hasValue}
          paddingY={1}
        >
          Centrera
        </Button>
      </div>
    </Stack>
  );
};
