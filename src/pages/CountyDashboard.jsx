import React, { useEffect, useState } from "react";
import {
  Box, Typography, FormControl, InputLabel, Select, MenuItem,
  TextField, Button, Paper, Divider
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";
import DownloadIcon from "@mui/icons-material/Download";

import ChartSection from "../components/ChartSection";
import DataTable from "../components/DataTable";
import {
  getIndicators,
  getCounties,
  getSeriesId
} from "../utils/IndicatorUtils";
import { downloadCSV } from "../utils/csvDownloader";

// Fetch available indicators and counties from utility functions
const CountyDashboard = () => {
  const indicators = getIndicators();
  const counties = getCounties();
    // State variables for filters and data
  const [selectedIndicator, setSelectedIndicator] = useState(indicators[0]);
  const [selectedCounty, setSelectedCounty] = useState(counties[0]);
  const [startDate, setStartDate] = useState(dayjs().subtract(1, "year")); // Default: 1 year ago
    const [endDate, setEndDate] = useState(dayjs()); // Default: today
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState({});
    // Fetch data whenever filters change
  useEffect(() => {
    const fetchData = async () => {
      const series_id = getSeriesId(selectedIndicator, selectedCounty);
      if (!series_id) return;

      try {
        const response = await axios.get(
          `http://localhost:4000/api/observations?series_id=${series_id}`
        );
          // Filter and clean the data
        const formatted = response.data.observations
          .filter((obs) => obs.value !== ".")
          .map((obs) => ({
            date: obs.date,
            value: Number(obs.value),
          }))
          .filter((entry) =>
            dayjs(entry.date).isAfter(startDate) &&
            dayjs(entry.date).isBefore(endDate)
          );
          // Store in data object under selectedCounty key
        setData({ [selectedCounty]: formatted });
      } catch (error) {
        console.error(`Error fetching data for ${selectedCounty}:`, error);
      }
    };

    fetchData();
  }, [selectedIndicator, selectedCounty, startDate, endDate]);

  return (
    <Box sx={{ px: 4, py: 2 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        County Dashboard
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Visualize and download county-level data indicators.
      </Typography>

      <Box sx={{ display: "flex", gap: 3, mt: 3 }}>
        {/* Sidebar Filters */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 2,
            width: "25%",
            minWidth: 280,
            height: "fit-content",
            position: "sticky",
            top: 90,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Filters
          </Typography>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Indicator</InputLabel>
            <Select
              value={selectedIndicator}
              onChange={(e) => setSelectedIndicator(e.target.value)}
              label="Indicator"
            >
              {indicators.map((ind) => (
                <MenuItem key={ind} value={ind}>{ind}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>County</InputLabel>
            <Select
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              label="County"
            >
              {counties.map((c) => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newDate) => setStartDate(newDate)}
              sx={{ mb: 2, width: "100%" }}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newDate) => setEndDate(newDate)}
              sx={{ mb: 2, width: "100%" }}
            />
          </LocalizationProvider>

          <Divider sx={{ my: 2 }} />

          <TextField
            fullWidth
            label="Search Table"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Paper>

        {/* Main Display */}
        <Box sx={{ flex: 1 }}>
          <Paper elevation={2} sx={{ p: 2, borderRadius: 2, mb: 3 }}>
            <ChartSection data={data[selectedCounty] || []} />
          </Paper>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Typography variant="h6" fontWeight={600}>
              {selectedCounty} – {selectedIndicator} Trends
            </Typography>

            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={() =>
                downloadCSV(data[selectedCounty] || [], `${selectedCounty}_${selectedIndicator}.csv`)
              }
            >
              Download CSV
            </Button>
          </Box>

          <DataTable data={data} searchTerm={searchTerm} />
        </Box>
      </Box>
    </Box>
  );
};

export default CountyDashboard;
