import { useState } from 'react';
import { Box, GridItem, SimpleGrid } from '@chakra-ui/react';
//@components
import { Button, Input } from '../../../../shared/components';

export default function Filters({ filtersList, onChange }) {
  const [filters, setFilters] = useState({
    ...filtersList,
  });
  return (
    <Box>
      <SimpleGrid columns={12} spacingX={5}>
        <GridItem colSpan={{ base: 12, lg: 5 }}>
          <Input
            type="date"
            name="startDate"
            label="Fecha inicio"
            value={filters.startDate}
            onChange={e =>
              setFilters({ ...filters, startDate: e.target.value })
            }
          />
        </GridItem>
        <GridItem colSpan={{ base: 12, lg: 5 }}>
          <Input
            type="date"
            name="endDate"
            label="Fecha término"
            value={filters.endDate}
            onChange={e => setFilters({ ...filters, endDate: e.target.value })}
          />
        </GridItem>
        <GridItem colSpan={{ base: 12, lg: 2 }} pt={5}>
          <Button onClick={() => onChange({ ...filters })}>Buscar</Button>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}
