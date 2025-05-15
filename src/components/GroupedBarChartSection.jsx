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

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

const getRandomColor = () =>
  `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;

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

  const chartData = {
    labels: allYears,
    datasets,
  };

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
