import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';

export type FilterValue = '' | 'completed' | 'not-completed';

interface FilterProps {
  filterValue: FilterValue;
  handleFilter: React.Dispatch<React.SetStateAction<FilterValue>>;
}

export function Filter({
  filterValue = '',
  handleFilter,
}: FilterProps): React.ReactElement {
  return (
    <FormControl>
      <InputLabel>Status</InputLabel>
      <Select
        value={filterValue}
        onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
          handleFilter(event.target.value as React.SetStateAction<FilterValue>)
        }>
        <MenuItem value=''>
          <em>All</em>
        </MenuItem>
        <MenuItem value='completed'>Completed</MenuItem>
        <MenuItem value='not-completed'>Not completed</MenuItem>
      </Select>
      <FormHelperText>Filter tickets by status</FormHelperText>
    </FormControl>
  );
}
