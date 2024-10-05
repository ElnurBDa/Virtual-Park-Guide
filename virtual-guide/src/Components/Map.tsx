import MapComponent from "./map/MapComponent";
import LegendComponent from "./map/LegendComponent";
import { Box } from '@mui/material';

const Map = ({ geojsonData }: { geojsonData: any }) => {
  return (
    <Box position="relative" sx={{my:3}}>
      <MapComponent geojson={geojsonData} />
      <LegendComponent geojson={geojsonData} />
    </Box>
  );
};

export default Map;
