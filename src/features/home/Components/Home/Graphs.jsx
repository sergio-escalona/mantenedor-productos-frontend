import { useState } from 'react';
import { Box, GridItem, SimpleGrid, Text } from '@chakra-ui/react';
//@components
import BarGraph from './BarGraph';
import PieGraph from './PieGraph';
import Filters from './Filters';

//@hooks
import useGetAllGraphs from '../../Hooks/useGetAllGraphs';

export default function Graphs() {
  const [filtersList, setFiltersList] = useState({
    startDate: '',
    endDate: '',
  });
  const { data, isLoading } = useGetAllGraphs({ filters: filtersList });

  return (
    <Box>
      <SimpleGrid columns={12} spacingY={5} spacingX={4}>
        <GridItem colSpan={{ base: 12 }}>
          <Filters filtersList={filtersList} onChange={setFiltersList} />
        </GridItem>
        <GridItem colSpan={{ base: 12, lg: 6 }}>
          <Text fontSize="md" fontWeight="700" color="brand.700" py={2}>
            Total de productos en stock por categoría
          </Text>
          {data && <BarGraph data={data} x={'name'} />}
        </GridItem>
        <GridItem colSpan={{ base: 12, lg: 6 }}>
          <Text fontSize="md" fontWeight="700" color="brand.700" py={2}>
            Cantidad de productos por categoría
          </Text>
          {data && <PieGraph data={data} dataKey={'count'} />}
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}
