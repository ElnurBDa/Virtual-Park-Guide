import React from "react";
import geojsonData from "./sample_park.json";
import Map from "./Components/Map";

const App: React.FC = () => {
  return (
    <div >
      <Map geojsonData={geojsonData} />
    </div>
  );
};

export default App;
