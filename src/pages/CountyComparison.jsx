import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Autocomplete,
  Paper,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";

import ChartSection from "../components/ChartSection";
import GroupedBarChartSection from "../components/GroupedBarChartSection";

import {
  getIndicators,
  getSeriesId,
  getCounties,
} from "../utils/IndicatorUtils";
// Load initial indicator and county lists
const CountyComparison = () => {
  const indicators = getIndicators();
  const counties = getCounties();

  const [selectedIndicator, setSelectedIndicator] = useState(indicators[0]);
  const [selectedCounties, setSelectedCounties] = useState([counties[0]]);
  const [startDate, setStartDate] = useState(dayjs().subtract(1, "year"));
  const [endDate, setEndDate] = useState(dayjs());
  const [data, setData] = useState({});
    // Fetch data on filter change
  useEffect(() => {
    const fetchAllData = async () => {
      const newData = {};
      for (const county of selectedCounties) {
        const seriesId = getSeriesId(selectedIndicator, county);
        if (!seriesId) continue;

        try {
          const response = await axios.get(
            `http://localhost:4000/api/observations?series_id=${seriesId}`
          );

          const filtered = response.data.observations
            .filter((obs) => obs.value !== ".")
            .map((obs) => ({
              date: obs.date,
              value: Number(obs.value),
            }))
            .filter(
              (entry) =>
                dayjs(entry.date).isAfter(startDate) &&
                dayjs(entry.date).isBefore(endDate)
            );

          newData[county] = filtered;
        } catch (err) {
          console.error(`Error fetching ${seriesId}`, err);
        }
      }
      setData(newData);
    };

    fetchAllData();
  }, [selectedIndicator, selectedCounties, startDate, endDate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Main Content */}
      <Box sx={{ display: "flex", gap: 4, p: 3, flex: 1 }}>
        {/* Filters Panel */}
        <Paper
          elevation={3}
          sx={{
            position: "sticky",
            top: 90,
            flexBasis: "25%",
            alignSelf: "start",
            p: 3,
            height: "fit-content",
          }}
        >
          <Typography variant="h6" gutterBottom>
            📊 Filters
          </Typography>

          <FormControl fullWidth margin="normal">
            <InputLabel>Indicator</InputLabel>
            <Select
              value={selectedIndicator}
              onChange={(e) => setSelectedIndicator(e.target.value)}
              label="Indicator"
            >
              {indicators.map((indicator) => (
                <MenuItem key={indicator} value={indicator}>
                  {indicator}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Autocomplete
            multiple
            options={["Select All", ...counties]}
            value={selectedCounties}
            onChange={(e, value) => {
              if (value.includes("Select All")) {
                setSelectedCounties(counties);
              } else {
                setSelectedCounties(value);
              }
            }}
            renderInput={(params) => (
              <TextField {...params} label="Counties" margin="normal" />
            )}
            getOptionLabel={(option) =>
              option === "Select All" ? "Select All Counties" : option
            }
            renderOption={(props, option) => (
              <li {...props}>
                {option === "Select All" ? "Select All Counties" : option}
              </li>
            )}
            disableCloseOnSelect
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(date) => setStartDate(date)}
              sx={{ mt: 2, width: "100%" }}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(date) => setEndDate(date)}
              sx={{ mt: 2, width: "100%" }}
            />
          </LocalizationProvider>
        </Paper>

        {/* Chart Area */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" mb={2}>
            County Comparison Dashboard
          </Typography>

          <ChartSection data={data} multiCounty={true} />
          <GroupedBarChartSection data={data} />
        </Box>
      </Box>
    </Box>
  );
};

export default CountyComparison;
