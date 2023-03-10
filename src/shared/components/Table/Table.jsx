//@libs
import { useState, useMemo, useContext } from 'react';
import { Box, Text } from '@chakra-ui/react';
import DataGrid, { useFocusRef } from 'react-data-grid';
import './style.css';

//@context
import { FilterContext } from './context';

//@components
import NoRows from './NoRows';
import Paginate from './Paginate';

export function FilterRenderer({ isCellSelected, column, children }) {
  const filters = useContext(FilterContext);
  const { ref, tabIndex } = useFocusRef(isCellSelected);

  return (
    <>
      <div>
        <Text fontSize={13} color="brand.500" fontWeight={700}>
          {column.name}
        </Text>
      </div>
      {filters.enabled && <div>{children({ ref, tabIndex, filters })}</div>}
    </>
  );
}

export default function CustomTable({
  columns,
  data,
  total,
  pages,
  setPage,
  filters,
  handleSelectedRows,
  onRowsChange,
  className,
}) {
  const [sortColumns, setSortColumns] = useState([]);
  const [selectedRows, setSelectedRows] = useState(() => new Set());

  function rowKeyGetter(row) {
    return row.index;
  }

  const sortedRows = useMemo(() => {
    if (sortColumns.length === 0) return data;

    return [...data];
  }, [data, sortColumns]);

  return (
    <Box>
      <Box pb={2}>
        <Text fontSize={12} color="#7D797A">
          {`${total} registro${total === 1 ? '' : 's'}`}
        </Text>
      </Box>
      <FilterContext.Provider value={filters}>
        <DataGrid
          className={`rdg-light ${className || ''}`}
          rowKeyGetter={rowKeyGetter}
          onRowsChange={onRowsChange}
          headerRowHeight={62}
          columns={columns}
          rows={sortedRows}
          selectedRows={selectedRows}
          renderers={{ noRowsFallback: <NoRows>Lista vacía</NoRows> }}
          onSelectedRowsChange={selected => {
            setSelectedRows(selected);
            if (handleSelectedRows) {
              handleSelectedRows(
                sortedRows
                  .filter((__, index) =>
                    Array.from(selected).includes(index + 1)
                  )
                  .map(item => item?.id || item?.code)
              );
            }
          }}
          sortColumns={sortColumns}
          onSortColumnsChange={setSortColumns}
          direction="ltr"
          rowHeight={50}
          rowClass={() => 'row'}
        />
      </FilterContext.Provider>
      <Box mt={5}>
        <Paginate pages={pages} setPage={setPage} />
      </Box>
    </Box>
  );
}
