import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  OutlinedInput,
  Typography
} from "@mui/material";

const FilterPanel = ({
  indicatorOptions,
  selectedIndicator,
  onIndicatorChange,
  countyOptions,
  selectedCounties,
  onCountiesChange
}) => {
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <FormControl fullWidth>
        <InputLabel>Select Indicator</InputLabel>
        <Select
          value={selectedIndicator}
          onChange={(e) => onIndicatorChange(e.target.value)}
          input={<OutlinedInput label="Select Indicator" />}
        >
          {indicatorOptions.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Select Counties</InputLabel>
        <Select
          multiple
          value={selectedCounties}
          onChange={(e) => onCountiesChange(e.target.value)}
          input={<OutlinedInput label="Select Counties" />}
        >
          {countyOptions.map((county) => (
            <MenuItem key={county} value={county}>
              {county}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterPanel;
