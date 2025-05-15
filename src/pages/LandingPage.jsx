import React from "react";
import {
  Box,
  Typography,
  Paper,
  Container,
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const LandingPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h3" gutterBottom>
        Tampa Bay Insights
      </Typography>

      <Typography variant="h6" color="textSecondary" paragraph>
        A regional data intelligence platform designed to provide transparent, accessible, and actionable insights across Tampa Bay's counties.
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={RouterLink}
          to="/compare"
        >
          Start Exploring
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 3, mt: 4, backgroundColor: "#f9f9f9" }}>
        <Typography variant="h5" gutterBottom>
          🌟 What We're Building
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Tampa Bay Insights</strong> is a comprehensive data visualization dashboard focused on counties in the Tampa Bay region, including Hillsborough, Pinellas, Pasco, Hernando, Manatee, and others. Our mission is to empower decision-makers, researchers, and community members by offering clear, contextualized data on key economic and demographic indicators.
        </Typography>

        <Typography variant="body1" paragraph>
          The platform is divided into two major tools:
        </Typography>

        <Typography variant="body1" component="ul" sx={{ pl: 3 }}>
          <li>
            <strong> County Dashboard:</strong> Explore detailed trends and statistics for a single county.
          </li>
          <li>
            <strong> County Comparison:</strong> Compare multiple counties side-by-side using flexible filters.
          </li>
        </Typography>

        <Typography variant="body1" paragraph sx={{ mt: 2 }}>
          Whether you're a policy analyst, journalist, or concerned citizen, Tampa Bay Insights helps you see the story behind the stats.
        </Typography>
      </Paper>

      <Box sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          🗺️ Florida Map with Tampa Bay Highlighted
        </Typography>
        <Box
          component="img"
          src="/floridaMap.jpg"
          alt="Florida map with Tampa Bay highlighted"
          sx={{
            width: "100%",
            maxWidth: 800,
            height: "auto",
            borderRadius: 2,
            boxShadow: 3,
          }}
        />
      </Box>
    </Container>
  );
};

export default LandingPage;
