import { useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material';
import SelectFilter from './components/SelectFilter';
import OrderTable from './components/Table';
import { orderData } from './data';
import { filterData, filterDataByDate } from './utils/filterUtils';

const allStatus = ['All', ...new Set(orderData.map((e) => e.status))];
const allSuppliers = ['All', ...new Set(orderData.map((e) => e.vendor))];

function App() {
  const [filters, setFilters] = useState({
    status: allStatus[0],
    supplier: allSuppliers[0],
  });

  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);

  const filteredData = useMemo(() => {
    const data = filterData(orderData, filters);
    return filterDataByDate(
      data,
      fromDate?.format('DD/MM/YYYY') || '',
      toDate?.format('DD/MM/YYYY') || '',
    );
  }, [filters, fromDate, toDate]);

  return (
    <Box marginTop="2rem">
      <Paper
        sx={{ display: 'flex', marginBottom: '2rem', alignItems: 'center' }}
      >
        <SelectFilter
          id="status"
          label="Status"
          value={filters.status}
          options={allStatus}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        />

        <SelectFilter
          id="suppliers"
          label="Suppliers"
          value={filters.supplier}
          options={allSuppliers}
          onChange={(e) => setFilters({ ...filters, supplier: e.target.value })}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            inputFormat="DD/MM/YYYY"
            value={fromDate}
            onChange={(newValue) => setFromDate(newValue)}
            renderInput={(params) => <TextField size="small" {...params} />}
          />

          <DatePicker
            label="Select Date"
            inputFormat="DD/MM/YYYY"
            value={toDate}
            onChange={(newValue) => setToDate(newValue)}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
        </LocalizationProvider>
      </Paper>

      <OrderTable orderData={filteredData} />
    </Box>
  );
}

export default App;
