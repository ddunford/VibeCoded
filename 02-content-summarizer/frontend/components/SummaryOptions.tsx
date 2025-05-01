import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { SummaryOptions as SummaryOptionsType } from '../types';

interface SummaryOptionsProps {
  options: SummaryOptionsType;
  onChange: (options: SummaryOptionsType) => void;
}

const SummaryOptions: React.FC<SummaryOptionsProps> = ({ options, onChange }) => {
  const handleLengthChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onChange({
      ...options,
      length: event.target.value as SummaryOptionsType['length']
    });
  };

  const handleFormatChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onChange({
      ...options,
      format: event.target.value as SummaryOptionsType['format']
    });
  };

  const handleCustomLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      onChange({
        ...options,
        customLength: value
      });
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <FormControl sx={{ flex: 1 }}>
        <InputLabel>Summary Length</InputLabel>
        <Select
          value={options.length}
          label="Summary Length"
          onChange={handleLengthChange}
        >
          <MenuItem value="brief">Brief</MenuItem>
          <MenuItem value="detailed">Detailed</MenuItem>
          <MenuItem value="custom">Custom Length</MenuItem>
        </Select>
      </FormControl>

      {options.length === 'custom' && (
        <TextField
          type="number"
          label="Custom Length"
          value={options.customLength || ''}
          onChange={handleCustomLengthChange}
          sx={{ flex: 1 }}
          inputProps={{ min: 1 }}
        />
      )}

      <FormControl sx={{ flex: 1 }}>
        <InputLabel>Format</InputLabel>
        <Select
          value={options.format}
          label="Format"
          onChange={handleFormatChange}
        >
          <MenuItem value="bullet">Bullet Points</MenuItem>
          <MenuItem value="paragraph">Paragraph</MenuItem>
          <MenuItem value="key-points">Key Points</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SummaryOptions; 