import { Style, Stroke, Fill, Text } from "ol/style";

export function createPolygonStyle(
  colors: { fill: string; stroke: string },
  name: string
): Style {
  return new Style({
    fill: new Fill({
      color: colors.fill,
    }),
    stroke: new Stroke({
      color: colors.stroke,
      width: 3,
    }),
    text: new Text({
      font: "12px Calibri,sans-serif",
      fill: new Fill({
        color: "#000",
      }),
      stroke: new Stroke({
        color: colors.stroke,
        width: 3,
      }),
      text: name,
    }),
  });
}
