import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import SelectFilter from './components/SelectFilter';
import OrderTable from './components/Table';
import { orderData } from './data';
import { filterData } from './utils/filterUtils';

const allStatus = ['All', ...new Set(orderData.map((e) => e.status))];
const allSuppliers = ['All', ...new Set(orderData.map((e) => e.vendor))];

function App() {
  const [filters, setFilters] = useState({
    status: allStatus[0],
    supplier: allSuppliers[0],
  });

  const filteredData = useMemo(() => filterData(orderData, filters), [filters]);

  return (
    <Box marginTop="2rem">
      <Paper sx={{ display: 'flex', marginBottom: '2rem' }}>
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
      </Paper>

      <OrderTable orderData={filteredData} />
    </Box>
  );
}

export default App;
