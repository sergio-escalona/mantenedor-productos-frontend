import { useContext } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useFocusRef } from 'react-data-grid';

import { FilterContext } from './context';

export default function FilterRenderer({ isCellSelected, column, children }) {
  const filters = useContext(FilterContext);
  const { ref, tabIndex } = useFocusRef(isCellSelected);

  return (
    <>
      <Box>
        <Text fontSize={13} color="brand.500" fontWeight={700}>
          {column.name}
        </Text>
      </Box>
      {filters?.enabled && <div>{children({ ref, tabIndex, filters })}</div>}
    </>
  );
}
