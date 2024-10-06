import React from "react";
import { Container, Typography, Box, Avatar } from "@mui/material";

const About: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Avatar
          alt="Logo"
          src="/logo512.png"
          sx={{ width: 128, height: 128, mb: 2 }}
        />
        <Typography variant="h4" component="h1" gutterBottom>
          About GreenGeo Virtual Guide
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to GreenGeo Virtual Guide! Our project aims to provide an
          immersive and interactive experience for exploring geographical
          locations virtually. Whether you're planning a trip or just curious
          about different places, our guide offers detailed information and
          stunning visuals to enhance your understanding and enjoyment.
        </Typography>
        <Typography variant="body1" paragraph>
          Our team has worked hard to compile accurate and up-to-date
          information from various sources to ensure you have the best
          experience possible. We hope you find our virtual guide helpful and
          informative.
        </Typography>
        <Typography variant="body1" paragraph>
          Thank you for choosing GreenGeo Virtual Guide. Happy exploring!
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
