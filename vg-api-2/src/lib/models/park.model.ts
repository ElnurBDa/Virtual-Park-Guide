import { t } from "elysia";

const geoJsonFeature = t.Object({
  type: t.Literal("Feature"),
  properties: t.Object({
    type: t.String(),
    name: t.Optional(t.String()),
    color: t.Optional(t.String()),
  }),
  geometry: t.Object({
    type: t.Union([
      t.Literal("Point"),
      t.Literal("LineString"),
      t.Literal("Polygon"),
    ]),
    coordinates: t.Any(),
  }),
  id: t.Optional(t.Number()),
});

const geoJsonFeatureCollection = t.Object({
  type: t.Literal("FeatureCollection"),
  features: t.Array(geoJsonFeature),
});

const parkModel = t.Object({
  name: t.String(),
  description: t.String(),
  images: t.Object({
    thumbnail: t.String(),
    gallery: t.Array(t.String()),
  }),
  geojson: geoJsonFeatureCollection,
});

export { parkModel };
