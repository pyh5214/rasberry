import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { PoetOption } from '../../types';
import { POETS } from '../../constants/poets';

interface PoetSelectorProps {
  value: PoetOption;
  onChange: (value: PoetOption) => void;
  disabled?: boolean;
}

const PoetSelector: React.FC<PoetSelectorProps> = ({ value, onChange, disabled = false }) => {
  const handleChange = (event: SelectChangeEvent<PoetOption>): void => {
    onChange(event.target.value as PoetOption);
  };

  return (
    <FormControl fullWidth sx={{ mb: 3 }} disabled={disabled}>
      <InputLabel id="poet-select-label">시인 선택</InputLabel>
      <Select
        labelId="poet-select-label"
        id="poet-select"
        value={value}
        label="시인 선택"
        onChange={handleChange}
      >
        {POETS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PoetSelector;
