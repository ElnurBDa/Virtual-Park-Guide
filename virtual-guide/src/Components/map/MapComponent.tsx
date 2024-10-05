import React, { useEffect } from "react";
import { Map, View } from "ol";
import "ol/ol.css";
import { fromLonLat } from "ol/proj";
import { Tile as TileLayer } from "ol/layer";
import XYZ from "ol/source/XYZ";
import { createVectorLayer } from "./VectorLayer";
import { GeoJSON } from "ol/format";
import { getCenter } from "ol/extent";

const MapComponent: React.FC<{
  geojson: any;
}> = ({ geojson }) => {
  useEffect(() => {
    const geojsonFormat = new GeoJSON();
    const features = geojsonFormat.readFeatures(geojson);
    const polygon = features[0].getGeometry();
    const center = getCenter(polygon!.getExtent());
    console.log(geojson);

    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            maxZoom: 19,
          }),
        }),
        createVectorLayer(geojson),
      ],
      view: new View({
        center: fromLonLat(center),
        zoom: 12,
      }),
    });

    return () => map.setTarget(undefined);
  }, [geojson]);

  return <div id="map" style={{ width: "100%", height: "500px" }} />;
};

export default MapComponent;
