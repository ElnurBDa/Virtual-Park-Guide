import { Style, Stroke } from "ol/style";
import { FeatureLike } from "ol/Feature";

export function createLineStringStyle(
  feature: FeatureLike,
  lineDash?: number[]
): Style {
  return new Style({
    stroke: new Stroke({
      color: feature.get("color") || "#000000",
      width: 3,
      lineDash: lineDash,
    }),
  });
}