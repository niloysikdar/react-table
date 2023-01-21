import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SelectFilter from '../SelectFilter';
import { orderData } from '../../data';
import useFilterStore, {
  getStatus,
  getSupplier,
  getDateFrom,
  getDateTo,
} from '../../store/filterStore';
import { Box } from '@mui/material';

const allStatus = ['All', ...new Set(orderData.map((e) => e.status))];
const allSuppliers = ['All', ...new Set(orderData.map((e) => e.vendor))];

const FiltersBar = () => {
  const status = getStatus();
  const supplier = getSupplier();
  const dateFrom = getDateFrom();
  const dateTo = getDateTo();
  const setStatus = useFilterStore((state) => state.setStatus);
  const setSupplier = useFilterStore((state) => state.setSupplier);
  const setDateFrom = useFilterStore((state) => state.setDateFrom);
  const setDateTo = useFilterStore((state) => state.setDateTo);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        marginBottom: '2rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: { xs: '1.5rem', md: '3rem' },
        border: '2px solid lightgray',
      }}
    >
      <SelectFilter
        id="status"
        label="Status"
        value={status}
        options={allStatus}
        onChange={(e) => setStatus(e.target.value)}
      />

      <SelectFilter
        id="suppliers"
        label="Suppliers"
        value={supplier}
        options={allSuppliers}
        onChange={(e) => setSupplier(e.target.value)}
      />

      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        flexWrap="wrap"
        justifyContent="center"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        gap="0.8rem"
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            inputFormat="DD/MM/YYYY"
            value={dateFrom}
            onChange={(newValue) => setDateFrom(newValue)}
            renderInput={(params) => <TextField size="small" {...params} />}
          />

          <Typography>To</Typography>

          <DatePicker
            label="Select Date"
            inputFormat="DD/MM/YYYY"
            value={dateTo}
            onChange={(newValue) => setDateTo(newValue)}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
        </LocalizationProvider>
      </Box>
    </Paper>
  );
};

export default FiltersBar;
