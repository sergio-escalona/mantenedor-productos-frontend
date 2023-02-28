//@hooks
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useMutateBuilder } from '../../../../shared/hooks';

//@validations
import { categorySchema } from './validations';

//@components
import { Flex } from '@chakra-ui/react';
import { Button, Input } from '../../../../shared/components';

const textButtonDict = {
  CREATE: 'Guardar',
  UPDATE: 'Actualizar',
};

const Form = ({ isOpen, onClose, type, data }) => {
  const initialValues = {
    name: '',
  };
  const { handleCreate: addCategory, handleUpdate: updateCategory } =
    useMutateBuilder({
      queryKey: 'products-category',
      successCreate: 'Categoría creada!',
      successUpdate: 'Categoría actualizada!',
    });

  const formik = useFormik({
    initialValues,
    validationSchema: categorySchema,
    validateOnMount: true,
    onSubmit: async values => {
      if (type === 'CREATE') {
        await addCategory.mutateAsync(values);
        addCategory.reset();
        formik.resetForm();
        onClose();
      }

      if (type === 'UPDATE') {
        const id = data?.id ? parseInt(data?.id, 10) : 0;
        await updateCategory.mutateAsync({ id: id, body: values });
        updateCategory.reset();
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
        <Flex mt={4} justify="center" gap={1}>
          <Button
            variant="outline"
            onClick={onClose}
            isLoading={addCategory.isLoading || updateCategory.isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            isLoading={addCategory.isLoading || updateCategory.isLoading}
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
