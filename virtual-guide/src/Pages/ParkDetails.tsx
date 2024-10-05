import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import Map from "../Components/Map";

const ParkDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the park ID from the URL
  const [parkData, setParkData] = useState<{
    name: string;
    description: string;
    geojson: any;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParkDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_VG_API}/parks/${id}`
        );
        setParkData(response.data);
      } catch (error) {
        console.error("Error fetching park details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchParkDetails();
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;

  if (!parkData || !parkData.geojson)
    return <Typography>No park details found.</Typography>;

  return (
    <Container>
      <Typography variant="h4">{parkData.name}</Typography>
      <Typography variant="body1">{parkData.description}</Typography>
      <Map geojsonData={parkData.geojson} />
    </Container>
  );
};

export default ParkDetails;
