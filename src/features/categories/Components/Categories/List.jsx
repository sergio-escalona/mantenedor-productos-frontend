import { useMemo, useState } from 'react';
import { SelectColumn } from 'react-data-grid';
import { Box, Center, GridItem, SimpleGrid } from '@chakra-ui/react';

import {
  FilterRenderer,
  Table,
  TableFilterInput,
} from '../../../../shared/components/Table';

//@hooks
import useGetAllCategories from '../../Hooks/useGetAllCategories';
import { useMutateBuilder } from '../../../../shared/hooks';

//@component
// import FiltersComponent from '@/features/masters.colors/components/Colors/Filters';
import CreateCategory from './CreateCategory';
import EditCategory from './EditCategory';
import { Menu } from '../../../../shared/components';
import { deleteAlert } from '../../../../utils/alerts';

const List = () => {
  const [filtersList, setFiltersList] = useState({
    id: '',
    name: '',
    sort: '',
    q: '',
    page: 1,
    size: 10,
    enabled: true,
  });
  const { data, isLoading } = useGetAllCategories({ filters: filtersList });
  const { handleDelete: handleDeleteCategory } = useMutateBuilder({
    queryKey: 'products-category',
    successDelete: 'Categoría eliminada!',
  });

  const deleteCategory = async row => {
    const { id, name } = row;

    const msg = {
      title: 'Eliminar Categoría',
      text: `¿Estás seguro de eliminar la Categoría: ${name}?`,
    };

    let confirm = await deleteAlert(msg.title, msg.text);
    if (confirm) {
      await handleDeleteCategory.mutateAsync(parseInt(id), {
        onError: err => {
          console.log(err);
        },
      });
    }
  };

  const options = [
    {
      label: 'Eliminar',
      onClick: category => deleteCategory(category),
    },
  ];

  const columns = useMemo(() => {
    return [
      { ...SelectColumn, frozen: false },
      {
        key: 'id',
        name: 'ID',
        width: '25%',
      },
      {
        key: 'name',
        name: 'Nombre',
        width: '25%',
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
        key: 'Editar',
        name: <Center h="100%">Editar</Center>,
        width: '25%',
        formatter(props) {
          const { row } = props;
          return (
            <Center h="100%">
              <EditCategory id={row.id || ''} />
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
          <CreateCategory />
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
