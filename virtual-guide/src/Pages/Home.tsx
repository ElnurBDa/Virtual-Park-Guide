import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";
import axios from "axios";
import Map from "../Components/Map";

const url = process.env.REACT_APP_VG_API;

interface Park {
  _id: string;
  name: string;
  description: string;
  images: {
    thumbnail: string;
  }
}

const Home: React.FC = () => {
  const [parks, setParks] = useState<Park[]>([]);
  const [loading, setLoading] = useState(true);
  const [map, setMap] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParks = async () => {
      try {
        const response = await axios.get(`${url}/parks`);
        setParks(response.data);
        const response2 = await axios.get(`${url}/map`);
        setMap(response2.data);
      } catch (error) {
        console.error("Error fetching parks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParks();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" style={{ textAlign: "center", marginTop: "50px" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" style={{ marginTop: "32px" }}>
      <Typography variant="h4" gutterBottom>
        Explore Parks
      </Typography>
      <Grid container spacing={4}>
        {parks.map((park) => (
          <Grid item key={park._id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                image={park.images.thumbnail || "https://via.placeholder.com/200"} // Fallback image
                alt={park.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {park.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {park.description.length > 100
                    ? `${park.description.substring(0, 100)}...`
                    : park.description}
                </Typography>
              </CardContent>
              <Button
                size="small"
                color="primary"
                onClick={() => navigate(`/park/${park._id}`)}
                style={{ margin: "16px" }}
              >
                View Details
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Divider sx={{ mb: 3 }} />
      <Typography variant="h4" gutterBottom>
        Explore Map
      </Typography>
      <Box sx={{ my: 3 }}>
      <Map geojsonData={map} />
      </Box>
    </Container>
  );
};

export default Home;
