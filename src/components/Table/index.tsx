import { useState } from 'react';
import type { RefObject, MouseEvent, ChangeEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import { visuallyHidden } from '@mui/utils';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import type { OrderData } from '../../data';
import { filterAndSearch } from '../../utils/filterAndSearch';
import { useOrderData } from '../../hooks/useOrderData';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator(
  order: Order,
  orderBy: any,
): (
  a: { [x: string]: number | string | boolean },
  b: { [x: string]: number | string | boolean },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: any;
  label: string;
  numeric: boolean;
}

export const headCells: readonly HeadCell[] = [
  {
    id: 'vendor',
    numeric: false,
    disablePadding: true,
    label: 'Vendor',
  },
  {
    id: 'vendorCode',
    numeric: true,
    disablePadding: false,
    label: 'Vendor Code',
  },
  {
    id: 'poId',
    numeric: true,
    disablePadding: false,
    label: 'PO#',
  },
  {
    id: 'poLine',
    numeric: true,
    disablePadding: false,
    label: 'PO Line',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'poValue',
    numeric: true,
    disablePadding: false,
    label: 'PO Value - INR',
  },
  {
    id: 'qtyOrdered',
    numeric: true,
    disablePadding: false,
    label: 'Qty Ordered',
  },
  {
    id: 'qtyShipped',
    numeric: true,
    disablePadding: false,
    label: 'Qty Shipped',
  },
  {
    id: 'grQuantity',
    numeric: true,
    disablePadding: false,
    label: 'GR Quantity',
  },
  {
    id: 'uom',
    numeric: true,
    disablePadding: false,
    label: 'UOM',
  },
  {
    id: 'dueDate',
    numeric: true,
    disablePadding: false,
    label: 'Due Date',
  },
  {
    id: 'committedDate',
    numeric: true,
    disablePadding: false,
    label: 'Committed Date',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
];

interface OrderTableProps {
  numSelected: number;
  onRequestSort: (
    event: MouseEvent<unknown>,
    property: keyof OrderData,
  ) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function OrderTableHead(props: OrderTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof OrderData) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead sx={{ backgroundColor: '#f3f4f6' }}>
      <TableRow>
        <TableCell
          padding="checkbox"
          sx={{ borderRight: '2px solid lightgray' }}
        >
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all',
            }}
            sx={{ marginRight: '3.5rem' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'left'}
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
            sx={
              headCell.numeric
                ? {
                    whiteSpace: 'nowrap',
                    transform: 'translate(10%)',
                    fontWeight: 'bold',
                    borderRight: '2px solid lightgray',
                  }
                : {
                    whiteSpace: 'nowrap',
                    fontWeight: 'bold',
                    borderRight: '2px solid lightgray',
                  }
            }
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function OrderTable() {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof OrderData>('poId');
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [animateParent] = useAutoAnimate();

  const { isLoading, data } = useOrderData();

  const orderData = filterAndSearch(data || []);

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof OrderData,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = orderData.map((n) => n.poId);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: MouseEvent<unknown>, name: number) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: number) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orderData.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper
        elevation={0}
        sx={{ width: '100%', mb: 2, border: '2px solid lightgray' }}
      >
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <OrderTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={orderData.length}
            />

            <TableBody
              ref={animateParent as RefObject<HTMLTableSectionElement>}
            >
              {orderData
                .slice()
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const isItemSelected = isSelected(row.poId);
                  const labelId = `order-table-checkbox-${row.poId}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.poId)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.poId}
                      selected={isItemSelected}
                      sx={{ whiteSpace: 'nowrap' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                        {row.notification ? (
                          <NotificationsIcon
                            sx={{
                              transform: 'translate(0, 30%)',
                              color: '#F6BE00',
                              marginRight: '2rem',
                            }}
                          />
                        ) : (
                          <Box
                            height="24px"
                            width="24px"
                            marginRight="2rem"
                            display="inline-block"
                          />
                        )}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="normal"
                        align="left"
                      >
                        {row.vendor}
                      </TableCell>
                      <TableCell align="center">{row.vendorCode}</TableCell>
                      <TableCell align="center">{row.poId}</TableCell>
                      <TableCell align="center">{row.poLine}</TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="center">
                        {row.poValue.toLocaleString()}
                      </TableCell>
                      <TableCell align="center">
                        {row.qtyOrdered.toLocaleString()}
                      </TableCell>
                      <TableCell align="center">
                        {row.qtyShipped?.toLocaleString() || '-'}
                      </TableCell>
                      <TableCell align="center">
                        {row.grQuantity?.toLocaleString() || '-'}
                      </TableCell>
                      <TableCell align="center">{row.uom}</TableCell>
                      <TableCell align="center">{row.dueDate}</TableCell>
                      <TableCell align="center">{row.committedDate}</TableCell>
                      <TableCell align="left">{row.status}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={orderData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {isLoading && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress size="3.5rem" />
        </Box>
      )}
    </Box>
  );
}

export default OrderTable;
