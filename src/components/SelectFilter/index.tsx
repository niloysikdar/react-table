import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface SelectFilterProps {
  id: string;
  label: string;
  value: any;
  options: string[];
  onChange: (event: SelectChangeEvent<any>, child: React.ReactNode) => void;
}

function SelectFilter({
  id,
  label,
  value,
  options,
  onChange,
}: SelectFilterProps) {
  return (
    <Box>
      <FormControl sx={{ minWidth: 180 }} size="small">
        <InputLabel id={id}>{label}</InputLabel>
        <Select
          labelId={id}
          id={id}
          value={value}
          label={label}
          onChange={onChange}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectFilter;
