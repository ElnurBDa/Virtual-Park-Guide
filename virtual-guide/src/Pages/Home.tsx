import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const url = process.env.REACT_APP_VG_API;

interface Park {
  _id: string;
  name: string;
  description: string;
  imageUrl: string; // Assuming each park has an image URL
}

const Home: React.FC = () => {
  const [parks, setParks] = useState<Park[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParks = async () => {
      try {
        const response = await axios.get(`${url}/parks`);
        setParks(response.data);
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
                height="200"
                image={park.imageUrl || "https://via.placeholder.com/200"} // Fallback image
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
    </Container>
  );
};

export default Home;
