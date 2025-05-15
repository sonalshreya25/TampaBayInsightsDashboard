import React from "react";
import { Box, CssBaseline } from "@mui/material";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  const location = useLocation();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Normalize styles across browsers */}
      <CssBaseline />

      {/* Custom reusable header with logo and nav */}
      <Header />

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flex: 1,
          p: 3,
          backgroundColor: "#f9f9fb",
        }}
      >
        {children}
      </Box>

      {/* Shared footer for all pages */}
      <Footer />
    </Box>
  );
};

export default MainLayout;
