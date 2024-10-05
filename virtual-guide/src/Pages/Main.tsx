import React from "react";
import { Container, Typography } from "@mui/material";
import Map from "../Components/Map";
import geojsonData from "../data/absheron.json";

const Main: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        {geojsonData.name}
      </Typography>
      <Map geojsonData={geojsonData.geojson} />
      <Typography variant="body1" gutterBottom>
        {geojsonData.description}
      </Typography>
    </Container>
  );
};

export default Main;
