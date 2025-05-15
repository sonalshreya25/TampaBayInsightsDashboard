import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Box,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
// Define navigation routes for the header
const routes = [
  { path: "/", label: "Home" },
  { path: "/dashboard", label: "County Dashboard" },
  { path: "/compare", label: "Compare Counties" },
];

const Header = () => {
  const location = useLocation();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#101820",
        borderBottom: "3px solid #00bcd4",
        px: 4,
        py: 1.5,
      }}
      elevation={4}
    >
      <Toolbar>
        {/* LEFT: Logo + Title + Nav */}
        <Stack direction="row" spacing={3} alignItems="center" flex={1}>
          <Box
            component="img"
            src="/tampaicon.webp"
            alt="Tampa Bay Logo"
            sx={{
              height: 40,
              width: "auto",
              filter: "invert(1)",
            }}
          />

          <Typography
            variant="h6"
            sx={{
              color: "#fff",
              fontWeight: 700,
              letterSpacing: 1.2,
              fontFamily: "'Segoe UI', Roboto, sans-serif",
              mr: 4,
            }}
          >
            Tampa Bay Insights
          </Typography>

          {/* NAVIGATION LINKS */}
          {routes.map((route) => (
            <Button
              key={route.path}
              component={Link}
              to={route.path}
              sx={{
                color: location.pathname === route.path ? "#00bcd4" : "#ccc",
                fontWeight: location.pathname === route.path ? 700 : 400,
                borderBottom:
                  location.pathname === route.path
                    ? "2px solid #00bcd4"
                    : "2px solid transparent",
                textTransform: "none",
                borderRadius: 0,
                px: 2,
                "&:hover": {
                  color: "#fff",
                  borderBottom: "2px solid #00bcd4",
                },
              }}
            >
              {route.label}
            </Button>
          ))}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
