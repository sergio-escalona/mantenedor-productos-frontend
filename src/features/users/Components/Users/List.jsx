//@libs
import { useMemo, useState } from 'react';
import { SelectColumn } from 'react-data-grid';
import { Box, Center, GridItem, SimpleGrid, Text } from '@chakra-ui/react';

//@hooks
import useGetAllUsers from '../../Hooks/useGetAllUsers';
import { useMutateBuilder } from '../../../../shared/hooks';

//@component
// import FiltersComponent from '@/features/masters.colors/components/Colors/Filters';
import CreateProduct from './CreateUser';
import EditProduct from './EditUser';
import { Menu } from '../../../../shared/components';
import { deleteAlert } from '../../../../utils/alerts';
import {
  FilterRenderer,
  Table,
  TableFilterInput,
} from '../../../../shared/components/Table';

const List = () => {
  const [filtersList, setFiltersList] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    sort: '',
    q: '',
    page: 1,
    size: 10,
    enabled: true,
  });
  const { data, isLoading } = useGetAllUsers({ filters: filtersList });
  const { handleDelete: handleDeleteUser } = useMutateBuilder({
    queryKey: 'users',
    successDelete: 'Usuario eliminado!',
  });

  const deleteUser = async row => {
    const { id, name } = row;

    const msg = {
      title: 'Eliminar Usuario',
      text: `¿Estás seguro de eliminar el producto: ${name}?`,
    };

    let confirm = await deleteAlert(msg.title, msg.text);
    if (confirm) {
      await handleDeleteUser.mutateAsync(parseInt(id), {
        onError: err => {
          console.log(err);
        },
      });
    }
  };

  const options = [
    {
      label: 'Eliminar',
      onClick: user => deleteUser(user),
    },
  ];

  const columns = useMemo(() => {
    return [
      { ...SelectColumn, frozen: false },
      {
        key: 'id',
        name: 'Id',
      },
      {
        key: 'firstName',
        name: 'Nombre',
        headerRenderer: props => (
          <FilterRenderer {...props}>
            {({ filters }) => (
              <TableFilterInput
                value={filters.firstName}
                onChange={e => {
                  setFiltersList({
                    ...filters,
                    firstName: e.target.value,
                  });
                }}
              />
            )}
          </FilterRenderer>
        ),
      },
      {
        key: 'lastName',
        name: 'Apellido',
        headerRenderer: props => (
          <FilterRenderer {...props}>
            {({ filters }) => (
              <TableFilterInput
                value={filters.lastName}
                onChange={e => {
                  setFiltersList({
                    ...filters,
                    lastName: e.target.value,
                  });
                }}
              />
            )}
          </FilterRenderer>
        ),
      },
      {
        key: 'email',
        name: 'Correo',
        headerRenderer: props => (
          <FilterRenderer {...props}>
            {({ filters }) => (
              <TableFilterInput
                value={filters.email}
                onChange={e => {
                  setFiltersList({
                    ...filters,
                    email: e.target.value,
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
        formatter(props) {
          const { row } = props;
          return (
            <Center h="100%">
              <EditProduct id={row.id || ''} />
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
