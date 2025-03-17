import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Zoom from "@mui/material/Zoom";

const HeroSection = () => {
  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1616348436168-de43ad0db179)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "80vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="lg">
        <Zoom in={true} timeout={1000}>
          <Box>
            <Typography variant="h2" sx={{ color: "#fff", mb: 2, fontWeight: "bold" }}>
              Discover Latest Phones
            </Typography>
            <Typography variant="h5" sx={{ color: "#fff", opacity: 0.9 }}>
              Find the best smartphones in one place.
            </Typography>
          </Box>
        </Zoom>
      </Container>
    </Box>
  );
};

export default HeroSection;
