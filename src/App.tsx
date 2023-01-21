import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Box } from '@mui/material';
import FiltersBar from './components/FiltersBar';
import SearchBar from './components/SearchBar';
import OrderTable from './components/Table';

const queryClient = new QueryClient();

function App() {
  return (
    <Box
      padding="2rem 1rem"
      sx={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}
    >
      <SearchBar />
      <FiltersBar />

      <QueryClientProvider client={queryClient}>
        <OrderTable />
      </QueryClientProvider>
    </Box>
  );
}

export default App;
