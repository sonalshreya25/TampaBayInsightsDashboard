// Import React and necessary components from Chart.js and MUI
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
  Title,
} from "chart.js";
import { Box, Typography } from "@mui/material";
// Register the required Chart.js components for the line chart
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
  Title
);
// Utility function to generate a random HSL color for line borders
const getRandomColor = () =>
  `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
// ChartSection component receives `data` and a `multiCounty` flag as props
const ChartSection = ({ data, multiCounty = false }) => {
    // Determine if the data contains multiple counties (multi-series line chart)
  const isMulti =
    multiCounty || (typeof data === "object" && !Array.isArray(data));
    // Extract labels (dates) for the x-axis from the data
  const labels =
    isMulti && data && Object.values(data).length
      ? Object.values(data)[0]?.map((d) => d.date) ?? []
      : Array.isArray(data)
      ? data.map((d) => d.date)
      : [];
    // Construct the datasets for the line chart
  const datasets = isMulti
    ? Object.entries(data ?? {}).map(([county, points]) => ({
        label: county,
        data: points.map((d) => d.value),
        borderColor: getRandomColor(),
        backgroundColor: "rgba(0,0,0,0.05)",
        fill: false,
        tension: 0.4,
      }))
    : Array.isArray(data)
    ? [
        {
          label: "Value",
          data: data.map((d) => d.value),
          borderColor: "#1976d2",
          backgroundColor: "rgba(25, 118, 210, 0.2)",
          fill: true,
          tension: 0.3,
        },
      ]
    : [];
    // Handle edge case when there's no data to display

  if ((labels?.length ?? 0) === 0 || (datasets?.length ?? 0) === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>No data available for the selected filters.</Typography>
      </Box>
    );
  }
    // Define the structure of the chart data
  const chartData = {
    labels,
    datasets,
  };
    // Define chart configuration options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Date",
        },
        ticks: {
          maxTicksLimit: 10,
          autoSkip: true,
        },
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };
    // Render the chart and title inside a styled Box
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Indicator Over Time
      </Typography>
      <Line data={chartData} options={options} />
    </Box>
  );
};

export default ChartSection;
