import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
const FiltersBar = lazy(() => import('./components/FiltersBar'));
const SearchBar = lazy(() => import('./components/SearchBar'));
const OrderTable = lazy(() => import('./components/Table'));

const queryClient = new QueryClient();

function App() {
  return (
    <Box
      padding="2rem 1rem"
      sx={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}
    >
      <Suspense
        fallback={
          <Box
            padding="2rem"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </Box>
        }
      >
        <SearchBar />
      </Suspense>

      <Suspense
        fallback={
          <Box
            padding="2rem"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </Box>
        }
      >
        <FiltersBar />
      </Suspense>

      <Suspense
        fallback={
          <Box
            padding="2rem"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </Box>
        }
      >
        <QueryClientProvider client={queryClient}>
          <OrderTable />
        </QueryClientProvider>
      </Suspense>
    </Box>
  );
}

export default App;
