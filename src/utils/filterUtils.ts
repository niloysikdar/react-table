import type { OrderData } from '../data';

export type Filters = { status: string; supplier: string };

export function filterData(
  data: OrderData[],
  filters: Filters,
): OrderData[] | [] {
  const { status, supplier } = filters;
  if (status === 'All' && supplier === 'All') {
    return data;
  }
  if (status === 'All') {
    return data.filter((item) => item.vendor === supplier);
  }
  if (supplier === 'All') {
    return data.filter((item) => item.status === status);
  }
  return data.filter(
    (item) => item.status === status && item.vendor === supplier,
  );
}

export function filterDataByDate(
  data: OrderData[],
  dateFrom: string,
  dateTo: string,
): OrderData[] | [] {
  if (dateFrom === '' && dateTo === '') {
    return data;
  }

  return data.filter((item) =>
    dateCheck({ from: dateFrom, to: dateTo, check: item.dueDate }),
  );
}

function dateCheck({
  from,
  to,
  check,
}: {
  from?: string;
  to?: string;
  check: string;
}): boolean {
  const fromSplit = from?.split('/') || [];
  const toSplit = to?.split('/') || [];
  const checkSplit = check.split('/');
  let from1, to1, check1;

  if (fromSplit.length !== 3 && toSplit.length !== 3) {
    return true;
  }

  if (fromSplit.length === 3 && toSplit.length !== 3) {
    from1 = new Date(
      parseInt(fromSplit[2]),
      parseInt(fromSplit[1]) - 1,
      parseInt(fromSplit[0]),
    ); // -1 because months are from 0 to 11
    check1 = new Date(
      parseInt(checkSplit[2]),
      parseInt(checkSplit[1]) - 1,
      parseInt(checkSplit[0]),
    );
    return check1 >= from1;
  }

  if (fromSplit.length !== 3 && toSplit.length === 3) {
    to1 = new Date(
      parseInt(toSplit[2]),
      parseInt(toSplit[1]) - 1,
      parseInt(toSplit[0]),
    );
    check1 = new Date(
      parseInt(checkSplit[2]),
      parseInt(checkSplit[1]) - 1,
      parseInt(checkSplit[0]),
    );
    return check1 <= to1;
  }

  from1 = new Date(
    parseInt(fromSplit[2]),
    parseInt(fromSplit[1]) - 1,
    parseInt(fromSplit[0]),
  ); // -1 because months are from 0 to 11
  to1 = new Date(
    parseInt(toSplit[2]),
    parseInt(toSplit[1]) - 1,
    parseInt(toSplit[0]),
  );
  check1 = new Date(
    parseInt(checkSplit[2]),
    parseInt(checkSplit[1]) - 1,
    parseInt(checkSplit[0]),
  );

  return check1 >= from1 && check1 <= to1;
}
