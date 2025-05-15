import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
// Register required Chart.js components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);
// Utility to generate a random HSL color for each dataset
const getRandomColor = () =>
  `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
// Main component for rendering a grouped bar chart
const GroupedBarChartSection = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>No data available for the bar chart.</Typography>
      </Box>
    );
  }

  // Group data by year
  const countyYearMap = {};

  for (const county in data) {
    data[county].forEach((entry) => {
      const year = entry.date.slice(0, 4); // Get the year
      if (!countyYearMap[county]) countyYearMap[county] = {};
      if (!countyYearMap[county][year]) countyYearMap[county][year] = [];
      countyYearMap[county][year].push(entry.value);
    });
  }

  // Get all years across counties
  const allYearsSet = new Set(
    Object.values(countyYearMap)
      .flatMap((yearMap) => Object.keys(yearMap))
  );
  const allYears = Array.from(allYearsSet).sort();
    //Build datasets for each county using average values per year
  const datasets = Object.entries(countyYearMap).map(([county, yearMap]) => ({
    label: county,
    data: allYears.map((year) => {
      const values = yearMap[year] || [];
      const avg = values.length > 0
        ? values.reduce((sum, v) => sum + v, 0) / values.length
        : 0;
      return avg;
    }),
    backgroundColor: getRandomColor(),
  }));

    // Final chart data object to pass into Chart.js
  const chartData = {
    labels: allYears,
    datasets,
  };
    // Configuration options for the grouped bar chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Grouped Bar Chart by Year",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Average Indicator Value",
        },
      },
    },
  };
    // Render the chart 
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        📊 Grouped Bar Chart (By Year)
      </Typography>
      <Bar data={chartData} options={options} />
    </Box>
  );
};

export default GroupedBarChartSection;
