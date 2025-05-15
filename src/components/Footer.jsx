import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => (
  <Box sx={{ py: 3, mt: 6, backgroundColor: "#f5f5f5", textAlign: "center" }}>
    <Typography variant="body2" color="textSecondary">
      © {new Date().getFullYear()} Tampa Bay Insights — Built by Sonal Shreya
    </Typography>
  </Box>
);

export default Footer;
