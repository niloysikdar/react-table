import { Box } from '@mui/material';
import FiltersBar from './components/FiltersBar';
import SearchBar from './components/SearchBar';
import OrderTable from './components/Table';

function App() {
  return (
    <Box paddingTop="2rem">
      <SearchBar />
      <FiltersBar />
      <OrderTable />
    </Box>
  );
}

export default App;
