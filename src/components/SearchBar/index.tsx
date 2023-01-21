import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useDebouncedCallback } from 'use-debounce';
import useFilterStore from '../../store/filterStore';

function SearchBar() {
  const setSearchTerm = useFilterStore((state) => state.setSearchTerm);

  const debounced = useDebouncedCallback((value: string) => {
    setSearchTerm(value);
  }, 300);

  return (
    <Paper
      sx={{ p: 2, display: 'flex', marginBottom: '2rem', alignItems: 'center' }}
    >
      <TextField
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        placeholder="Search"
        defaultValue=""
        onChange={(e) => debounced(e.target.value)}
      />
    </Paper>
  );
}

export default SearchBar;
