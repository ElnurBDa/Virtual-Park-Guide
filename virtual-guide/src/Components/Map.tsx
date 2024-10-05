import MapComponent from "./map/MapComponent";
import LegendComponent from "./map/LegendComponent";

const Map = ({ geojsonData }: { geojsonData: any }) => {
  return (
    <div style={{ position: "relative" }}>
      <h1>Map</h1>
      <MapComponent geojson={geojsonData} />
      <LegendComponent geojson={geojsonData} />
    </div>
  );
};

export default Map;
