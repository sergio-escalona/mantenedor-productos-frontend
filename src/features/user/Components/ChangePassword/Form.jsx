//@hooks
import { useState } from 'react';
import { useFormik } from 'formik';
import {
  updateUserPassword,
  useAuthState,
  useAuthDispatch,
} from '../../../../context';
import PasswordValidator from '../../../auth/Components/Auth/PasswordValidator';

//@validations
import { changeSchema } from './validations';

//@components
import {
  Flex,
  Box,
  Text,
  InputRightElement,
  IconButton,
  useTheme,
} from '@chakra-ui/react';
import {
  AiOutlineEye as ViewIcon,
  AiOutlineEyeInvisible as HideIcon,
} from 'react-icons/ai';
import { Button, Input } from '../../../../shared/components';

const Form = () => {
  const dispatch = useAuthDispatch();
  const theme = useTheme();
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const { loading, user } = useAuthState();

  const initialValues = {
    password1: '',
    password2: '',
    oldPassword: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: changeSchema,
    validateOnMount: true,
    onSubmit: async values => {
      const validate = PasswordValidator(values.password1);
      if (!validate) {
        setError('La contraseña no cumple con las condiciones');
        formik.setSubmitting(false);
      } else if (values.password1 !== values.password2) {
        setError('Las contraseñas deben ser iguales');
        formik.setSubmitting(false);
      } else {
        updateUserPassword(dispatch, {
          id: user.id,
          oldPass: values.oldPassword,
          newPass: values.password1,
        });
      }
    },
  });

  const handleSubmit = async event => {
    event.preventDefault();
    formik.handleSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap={2}>
        <Box my={2}>
          <Text fontSize="17px" color="#36355F">
            Debes ingresar una nueva contraseña para poder iniciar sesión. Tu
            contraseña debe contener al menos 8 caracteres, al menos 1 número,
            al 1 una letra mayúscula, al 1 una letra minúscula y al menos 1
            caracter especial.
          </Text>
        </Box>
        <Input
          required
          name="oldPassword"
          type={show ? 'text' : 'password'}
          label="Contraseña actual"
          value={formik.values.oldPassword}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.oldPassword)}
          helperText={formik.errors.oldPassword}
          children={
            <InputRightElement pt={2}>
              <IconButton
                onClick={() => {
                  setShow(!show);
                }}
                bg="transparent"
                aria-label="view button"
                icon={
                  show ? (
                    <HideIcon size={20} color={theme.colors.brand[500]} />
                  ) : (
                    <ViewIcon size={20} color={theme.colors.brand[500]} />
                  )
                }
              />
            </InputRightElement>
          }
        />
        <Input
          required
          name="password1"
          type={show ? 'text' : 'password'}
          label="Contraseña"
          value={formik.values.password1}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.password1)}
          helperText={formik.errors.password1}
          children={
            <InputRightElement pt={2}>
              <IconButton
                onClick={() => {
                  setShow(!show);
                }}
                bg="transparent"
                aria-label="view button"
                icon={
                  show ? (
                    <HideIcon size={20} color={theme.colors.brand[500]} />
                  ) : (
                    <ViewIcon size={20} color={theme.colors.brand[500]} />
                  )
                }
              />
            </InputRightElement>
          }
        />
        <Input
          required
          name="password2"
          type={show ? 'text' : 'password'}
          label="Repetir contraseña"
          value={formik.values.password2}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.password2)}
          helperText={formik.errors.password2}
          children={
            <InputRightElement pt={2}>
              <IconButton
                onClick={() => {
                  setShow(!show);
                }}
                bg="transparent"
                aria-label="view button"
                icon={
                  show ? (
                    <HideIcon size={20} color={theme.colors.brand[500]} />
                  ) : (
                    <ViewIcon size={20} color={theme.colors.brand[500]} />
                  )
                }
              />
            </InputRightElement>
          }
        />
        {error && (
          <Box my={2}>
            <Text fontSize="17px" color="red">
              {error}
            </Text>
          </Box>
        )}
        <Flex mt={4} justify="center" gap={1}>
          <Button type="submit" isLoading={loading} disabled={!formik.isValid}>
            Cambiar
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};
export default Form;
