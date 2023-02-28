//@hooks
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useMutateBuilder } from '../../../../shared/hooks';
import useGetAllCategories from '../../../categories/Hooks/useGetAllCategories';

//@validations
import { productSchema } from './validations';

//@components
import { Flex } from '@chakra-ui/react';
import { Button, Input, Select } from '../../../../shared/components';

const textButtonDict = {
  CREATE: 'Guardar',
  UPDATE: 'Actualizar',
};

const Form = ({ isOpen, onClose, type, data }) => {
  const initialValues = {
    name: '',
    shortName: '',
    description: '',
    price: null,
    categoryId: null,
  };
  const { handleCreate: addProduct, handleUpdate: updateProduct } =
    useMutateBuilder({
      queryKey: 'products',
      successCreate: 'Producto creado!',
      successUpdate: 'Producto actualizado!',
    });
  const { data: categories } = useGetAllCategories({});

  const formik = useFormik({
    initialValues,
    validationSchema: productSchema,
    validateOnMount: true,
    onSubmit: async values => {
      if (type === 'CREATE') {
        await addProduct.mutateAsync(values);
        addProduct.reset();
        formik.resetForm();
        onClose();
      }

      if (type === 'UPDATE') {
        const id = data?.code ? parseInt(data?.code, 10) : 0;
        await updateProduct.mutateAsync({ id: id, body: values });
        updateProduct.reset();
        formik.resetForm();
        onClose();
      }
    },
  });

  const handleSubmit = async event => {
    event.preventDefault();
    formik.handleSubmit();
  };

  useEffect(() => {
    if (isOpen && type === 'CREATE') {
      formik.resetForm();
      return;
    }
    formik.setValues({
      ...formik.values,
      name: data?.name || '',
      shortName: data?.shortName || '',
      description: data?.description || '',
      price: data?.price || null,
      categoryId: data?.categoryId || null,
    });
  }, [isOpen, data]);

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap={2}>
        <Input
          required
          name="name"
          label="Nombre"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.name)}
          helperText={formik.errors.name}
        />
        <Input
          required
          name="shortName"
          label="Nombre corto"
          value={formik.values.shortName}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.shortName)}
          helperText={formik.errors.shortName}
        />
        <Input
          required
          name="description"
          label="Descripción"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.description)}
          helperText={formik.errors.description}
        />
        <Input
          required
          type="number"
          name="price"
          label="Precio"
          value={formik.values.price}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.price)}
          helperText={formik.errors.price}
        />
        <Select
          label="Categoría"
          isRequired
          name="categoryId"
          value={formik.values.categoryId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
          helperText={formik.touched.categoryId && formik.errors.categoryId}
        >
          <option value="">Seleccione categoría</option>
          {categories &&
            categories.items.map(category => (
              <option key={`option-${category.id}`} value={category.id}>
                {category.name}
              </option>
            ))}
        </Select>
        <Flex mt={4} justify="center" gap={1}>
          <Button
            variant="outline"
            onClick={onClose}
            isLoading={addProduct.isLoading || updateProduct.isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            isLoading={addProduct.isLoading || updateProduct.isLoading}
            disabled={!formik.isValid}
          >
            {textButtonDict[type]}
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};
export default Form;
