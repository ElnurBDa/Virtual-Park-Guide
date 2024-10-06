import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, ImageList, ImageListItem, Divider, Box } from "@mui/material";
import Map from "../Components/Map";

const ParkDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the park ID from the URL
  const [parkData, setParkData] = useState<{
    name: string;
    description: string;
    images: {
      gallery: string[];
    };
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
      <Typography variant="h4" gutterBottom>
        {parkData.name}
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6" gutterBottom>
        Park Description
      </Typography>
      <Typography variant="body1" paragraph>
        {parkData.description}
      </Typography>

      <Box sx={{ my: 3 }}>
        <Map geojsonData={parkData.geojson} />
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6" gutterBottom>
        Image Gallery
      </Typography>

      {parkData.images?.gallery.length > 0 ? (
        <ImageList cols={3} gap={8}>
          {parkData.images.gallery.map((image, index) => (
            <ImageListItem key={index}>
              <img
                src={image}
                alt={`Park Image ${index + 1}`}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  transition: "transform 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No images available for this park.
        </Typography>
      )}
    </Container>
  );
};

export default ParkDetails;
