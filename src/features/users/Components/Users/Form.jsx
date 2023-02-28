//@hooks
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useMutateBuilder } from '../../../../shared/hooks';

//@validations
import { userSchema } from './validations';

//@components
import { Flex } from '@chakra-ui/react';
import { Button, Input } from '../../../../shared/components';

const textButtonDict = {
  CREATE: 'Guardar',
  UPDATE: 'Actualizar',
};

const Form = ({ isOpen, onClose, type, data }) => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  const { handleCreate: addUser, handleUpdate: updateUser } = useMutateBuilder({
    queryKey: 'users',
    successCreate: 'Usuario creado!',
    successUpdate: 'Usuario actualizado!',
  });

  const formik = useFormik({
    initialValues,
    validationSchema: userSchema,
    validateOnMount: true,
    onSubmit: async values => {
      if (type === 'CREATE') {
        await addUser.mutateAsync(values);
        addUser.reset();
        formik.resetForm();
        onClose();
      }

      if (type === 'UPDATE') {
        const id = data?.id ? parseInt(data?.id, 10) : 0;
        await updateUser.mutateAsync({ id: id, body: values });
        updateUser.reset();
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
      firstName: data?.firstName || '',
      lastName: data?.lastName || '',
      email: data?.email || '',
      password: data?.password || '',
    });
  }, [isOpen, data]);

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap={2}>
        <Input
          required
          name="firstName"
          label="Nombre"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.firstName)}
          helperText={formik.errors.firstName}
        />
        <Input
          required
          name="lastName"
          label="Apellido"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.lastName)}
          helperText={formik.errors.lastName}
        />
        <Input
          required
          name="email"
          label="Correo"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.email)}
          helperText={formik.errors.email}
        />
        <Input
          required
          name="password"
          label="Contraseña"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.password)}
          helperText={formik.errors.password}
        />
        <Flex mt={4} justify="center" gap={1}>
          <Button
            variant="outline"
            onClick={onClose}
            isLoading={addUser.isLoading || updateUser.isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            isLoading={addUser.isLoading || updateUser.isLoading}
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
