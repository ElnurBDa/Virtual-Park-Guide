import { GeoJSON } from "ol/format";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { createPointStyle } from "./utils/createPointStyle";
import { createLineStringStyle } from "./utils/createLineStringStyle";
import { createPolygonStyle } from "./utils/createPolygonStyle";
import pointIcons from "./utils/pointIcons";
import PolygonColors from "./utils/PolygonColors";

export const createVectorLayer = (geojson: any) => {
  return new VectorLayer({
    source: new VectorSource({
      features: new GeoJSON().readFeatures(geojson, {
        featureProjection: "EPSG:3857",
      }),
    }),
    style: (feature) => {
      const geometry = feature.getGeometry()?.getType();
      const type = feature.get("type");
      const name = feature.get("name");
      const description = feature.get("description");

      let iconStyle;
      switch (geometry) {
        case "Point": {
          switch (type) {
            case "entry":
              iconStyle = createPointStyle(
                pointIcons.entry,
                description,
                "#fff",
                "green",
                15
              );
              break;
            case "finish":
              iconStyle = createPointStyle(
                pointIcons.finish,
                description,
                "#fff",
                "red",
                15
              );
              break;
            case "attraction":
              iconStyle = createPointStyle(
                pointIcons.attraction,
                description,
                "#fff",
                "gold",
                15
              );
              break;
            case "rest":
              iconStyle = createPointStyle(
                pointIcons.rest,
                description,
                "#fff",
                "blue",
                20
              );
              break;
            case "wildlife":
              iconStyle = createPointStyle(
                pointIcons.wildlife,
                description,
                "#fff",
                "brown",
                20
              );
              break;
            case "camp":
              iconStyle = createPointStyle(
                pointIcons.camp,
                description,
                "#fff",
                "green",
                20
              );
              break;
            case "WC":
              iconStyle = createPointStyle(
                pointIcons.WC,
                description,
                "#fff",
                "blue",
                20
              );
              break;
            case "info_point":
              iconStyle = createPointStyle(
                pointIcons.info_point,
                description,
                "#fff",
                "orange",
                20
              );
              break;
            case "administration":
              iconStyle = createPointStyle(
                pointIcons.administration,
                description,
                "#fff",
                "purple",
                20
              );
              break;
            case "parking":
              iconStyle = createPointStyle(
                pointIcons.parking,
                description,
                "#fff",
                "gray",
                20
              );
              break;
            case "hotel":
              iconStyle = createPointStyle(
                pointIcons.hotel,
                description,
                "#fff",
                "darkblue",
                20
              );
              break;
            case "nocar":
              iconStyle = createPointStyle(
                pointIcons.nocar,
                description,
                "#fff",
                "red",
                20
              );
              break;
            case "boat":
              iconStyle = createPointStyle(
                pointIcons.boat,
                description,
                "#fff",
                "blue",
                20
              );
              break;
            case "walk":
              iconStyle = createPointStyle(
                pointIcons.walk,
                description,
                "#fff",
                "green",
                20
              );
              break;
            case "endurance":
              iconStyle = createPointStyle(
                pointIcons.endurance,
                description,
                "#fff",
                "brown",
                20
              );
              break;
            case "info":
              iconStyle = createPointStyle(
                pointIcons.info,
                description,
                "#fff",
                "blue",
                20
              );
              break;
            case "landscape":
              iconStyle = createPointStyle(
                pointIcons.landscape,
                description,
                "#fff",
                "green",
                20
              );
              break;
            case "picnic":
              iconStyle = createPointStyle(
                pointIcons.picnic,
                description,
                "#fff",
                "gold",
                20
              );
              break;
            default:
              iconStyle = createPointStyle(
                pointIcons.attraction,
                description,
                "#fff",
                "gold",
                15
              );
              break;
          }
          break;
        }
        case "LineString":
          {
            switch (type) {
              case "car":
                iconStyle = createLineStringStyle(feature, undefined);
                break;
              case "walk":
                iconStyle = createLineStringStyle(feature, [10, 10]);
                break;
              case "boat":
                iconStyle = createLineStringStyle(feature, [5, 5]);
                break;
              default:
                iconStyle = createLineStringStyle(feature, undefined);
                break;
            }
          }
          break;
        case "Polygon":
          {
            switch (type) {
              case "park":
                iconStyle = createPolygonStyle(PolygonColors.park, name);

                break;
              case "lake":
                iconStyle = createPolygonStyle(PolygonColors.lake, name);
                break;
              case "forest":
                iconStyle = createPolygonStyle(PolygonColors.forest, name);
                break;
              default:
                iconStyle = createPolygonStyle(
                  PolygonColors.defaultPolygon,
                  name
                );
                break;
            }
          }

          break;
      }

      return iconStyle;
    },
  });
};
