import { useMemo, useState } from 'react';
import { SelectColumn } from 'react-data-grid';
import { Box, Center, GridItem, SimpleGrid, Text } from '@chakra-ui/react';

import {
  FilterRenderer,
  Table,
  TableFilterInput,
  TableFilterSelect,
} from '../../../../shared/components/Table';

//@hooks
import useGetAllProducts from '../../Hooks/useGetAllProducts';
import { useMutateBuilder } from '../../../../shared/hooks';
import useGetAllCategories from '../../../categories/Hooks/useGetAllCategories';

//@component
// import FiltersComponent from '@/features/masters.colors/components/Colors/Filters';
import CreateProduct from './CreateProduct';
import EditProduct from './EditProduct';
import { Menu } from '../../../../shared/components';
import { deleteAlert } from '../../../../utils/alerts';

const List = () => {
  const [filtersList, setFiltersList] = useState({
    id: '',
    name: '',
    shortName: '',
    description: '',
    price: null,
    categoryId: null,
    sort: '',
    q: '',
    page: 1,
    size: 10,
    enabled: true,
  });
  const { data, isLoading } = useGetAllProducts({ filters: filtersList });
  const { data: categories } = useGetAllCategories({});
  const { handleDelete: handelDeleteProduct } = useMutateBuilder({
    queryKey: 'products',
    successDelete: 'Producto eliminado!',
  });

  const deleteProduct = async row => {
    const { id, name } = row;

    const msg = {
      title: 'Eliminar Producto',
      text: `¿Estás seguro de eliminar el producto: ${name}?`,
    };

    let confirm = await deleteAlert(msg.title, msg.text);
    if (confirm) {
      await handelDeleteProduct.mutateAsync(parseInt(id), {
        onError: err => {
          console.log(err);
        },
      });
    }
  };

  const options = [
    {
      label: 'Eliminar',
      onClick: product => deleteProduct(product),
    },
  ];

  const columns = useMemo(() => {
    return [
      { ...SelectColumn, frozen: false },
      {
        key: 'code',
        name: 'Código',
      },
      {
        key: 'name',
        name: 'Nombre',
        headerRenderer: props => (
          <FilterRenderer {...props}>
            {({ filters }) => (
              <TableFilterInput
                value={filters.name}
                onChange={e => {
                  setFiltersList({
                    ...filters,
                    name: e.target.value,
                  });
                }}
              />
            )}
          </FilterRenderer>
        ),
      },
      {
        key: 'shortName',
        name: 'Nombre corto',
        headerRenderer: props => (
          <FilterRenderer {...props}>
            {({ filters }) => (
              <TableFilterInput
                value={filters.shortName}
                onChange={e => {
                  setFiltersList({
                    ...filters,
                    shortName: e.target.value,
                  });
                }}
              />
            )}
          </FilterRenderer>
        ),
      },
      {
        key: 'description',
        name: 'Descripción',
        headerRenderer: props => (
          <FilterRenderer {...props}>
            {({ filters }) => (
              <TableFilterInput
                value={filters.description}
                onChange={e => {
                  setFiltersList({
                    ...filters,
                    description: e.target.value,
                  });
                }}
              />
            )}
          </FilterRenderer>
        ),
      },
      {
        key: 'price',
        name: 'Precio',
        headerRenderer: props => (
          <FilterRenderer {...props}>
            {({ filters }) => (
              <TableFilterInput
                value={filters.price}
                onChange={e => {
                  setFiltersList({
                    ...filters,
                    price: e.target.value,
                  });
                }}
              />
            )}
          </FilterRenderer>
        ),
      },
      {
        key: 'product_categories',
        name: 'Categoria',
        headerRenderer: props => (
          <FilterRenderer {...props}>
            {({ filters }) => (
              <TableFilterSelect
                onChange={e => {
                  setFiltersList({ ...filters, categoryId: e.target.value });
                }}
              >
                {categories &&
                  categories.items.map(item => (
                    <option key={`option-${item.id}`} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </TableFilterSelect>
            )}
          </FilterRenderer>
        ),
        formatter(props) {
          const { row } = props;
          return <Text>{row.product_categories.name}</Text>;
        },
      },
      {
        key: 'Editar',
        name: <Center h="100%">Editar</Center>,
        formatter(props) {
          const { row } = props;
          return (
            <Center h="100%">
              <EditProduct id={row.code || ''} />
            </Center>
          );
        },
      },
      {
        key: 'Opciones',
        name: <Center h="100%">Opciones</Center>,
        width: 'auto',
        formatter(props) {
          const { row } = props;
          return (
            <Center h="100%">
              <Menu currentItem={row} options={options} />
            </Center>
          );
        },
      },
    ];
  }, []);

  const changePage = newPage => {
    setFiltersList({ ...filtersList, page: newPage });
  };

  return (
    <Box>
      <SimpleGrid columns={12} spacingY={3}>
        {/* <GridItem colSpan={{ base: 12, lg: 8, xl: 7 }}>
          <FiltersComponent />
        </GridItem> */}
        <GridItem
          colSpan={{ base: 12, lg: 5, xl: 5 }}
          display="flex"
          justifyContent="flex-end"
        >
          <CreateProduct />
        </GridItem>
      </SimpleGrid>
      <Box pt={3}>
        <Table
          total={data?.total || 0}
          columns={columns}
          filters={filtersList}
          data={
            data?.items.map((item, index) => ({
              ...item,
              index: index + 1,
            })) || []
          }
          pages={data?.pages || 1}
          setPage={changePage}
        />
      </Box>
    </Box>
  );
};

export default List;
