import { useRef } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { useDebouncedCallback } from 'use-debounce';
import { CSVLink } from 'react-csv';
import useFilterStore from '../../store/filterStore';
import { useOrderData } from '../../hooks/useOrderData';
import { headCells } from '../Table';

function SearchBar() {
  const exportCSVRef = useRef<any>(null);
  const { isLoading, data } = useOrderData();

  const setSearchTerm = useFilterStore((state) => state.setSearchTerm);

  const debounced = useDebouncedCallback((value: string) => {
    setSearchTerm(value);
  }, 300);

  const headers = headCells.map((headCell) => ({
    label: headCell.label,
    key: headCell.id,
  }));

  const csvData = data?.map(({ id, notification, ...rest }) => ({ ...rest }));

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        marginBottom: '1rem',
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '2px solid lightgray',
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h6" fontWeight={600} letterSpacing={1}>
          PO Actions
        </Typography>
        <ArrowDropDownIcon fontSize="large" />
      </Box>

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="flex-start"
        alignItems="center"
        gap={3}
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

        <Button
          variant="contained"
          disabled={isLoading}
          startIcon={<SystemUpdateAltIcon />}
          sx={{
            textTransform: 'none',
            fontSize: '1rem',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
          }}
          onClick={() => exportCSVRef.current.link.click()}
        >
          Export
        </Button>

        <CSVLink
          ref={exportCSVRef}
          style={{ display: 'hidden' }}
          data={csvData || []}
          headers={headers}
          filename="purchase-orders.csv"
        />
      </Box>
    </Paper>
  );
}

export default SearchBar;
