import React, { useEffect } from "react";
import "ol/ol.css";
import { GeoJSON } from "ol/format";
import pointIcons from "./utils/pointIcons";
import { FaSquare } from "react-icons/fa";
import PolygonColors from "./utils/PolygonColors";

interface G {
  geometry: string | undefined;
  type: string | undefined;
  name: string | undefined;
  color: string | undefined;
}

const LegendComponent: React.FC<{
  geojson: any;
}> = ({ geojson }) => {
  const [points, setPoints] = React.useState<G[]>([]);
  const [trails, setTrails] = React.useState<G[]>([]);
  const [areas, setAreas] = React.useState<G[]>([]);
  useEffect(() => {
    const geojsonFormat = new GeoJSON();
    const features = geojsonFormat.readFeatures(geojson);
    const types = features
      .filter((feature) => feature.get("type"))
      .map((feature) => {
        const geometry = feature.getGeometry()?.getType();
        const type = feature.get("type");
        const name = feature.get("name");
        const color =
          feature.get("color") ||
          (PolygonColors[type as keyof typeof PolygonColors]
            ? PolygonColors[type as keyof typeof PolygonColors].fill
            : undefined);
        return { geometry, type, name, color };
      })
      .filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) => t.type === value.type && t.geometry === value.geometry
          )
      );
    const points = types.filter((type) => type.geometry === "Point");
    const trails = types.filter((type) => type.geometry === "LineString");
    const areas = types.filter((type) => type.geometry === "Polygon");

    setPoints(points);
    setTrails(trails);
    setAreas(areas);
  }, [geojson]);

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "white",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
      }}
    >
      <h2 style={{ borderBottom: "2px solid #ccc", paddingBottom: "10px" }}>
        Legend
      </h2>

      <details style={{ marginBottom: "20px" }}>
        <summary style={{ color: "#2c3e50", cursor: "pointer" }}>Points</summary>
        {points.map((point) => (
          <div
            key={point.type}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div style={{ marginRight: "10px" }}>
              {pointIcons[point.type as keyof typeof pointIcons]}
            </div>
            <p style={{ margin: 0 }}>{point.type}</p>
          </div>
        ))}
      </details>

      <details style={{ marginBottom: "20px" }}>
        <summary style={{ color: "#2c3e50", cursor: "pointer" }}>Trails</summary>
        {trails.map((trail) => (
          <div
            key={trail.type}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <FaSquare
              size={20}
              color={trail.color}
              style={{ marginRight: "10px" }}
            />
            <p style={{ margin: 0 }}>
              {trail.type} - {trail.name}
            </p>
          </div>
        ))}
      </details>

      <details>
        <summary style={{ color: "#2c3e50", cursor: "pointer" }}>Areas</summary>
        {areas.map((area) => (
          <div
            key={area.type}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <FaSquare
              size={20}
              color={area.color}
              style={{ marginRight: "10px" }}
            />
            <p style={{ margin: 0 }}>
              {area.type} - {area.name}
            </p>
          </div>
        ))}
      </details>
    </div>
  );
};

export default LegendComponent;
