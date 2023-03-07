import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Center,
  Text,
  VStack,
  InputRightElement,
  IconButton,
  useTheme,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import {
  AiOutlineEye as ViewIcon,
  AiOutlineEyeInvisible as HideIcon,
} from 'react-icons/ai';
import { Button, Input, Logo } from '../../../shared/components';
import {
  confirmRecoveryPassword,
  useAuthState,
  useAuthDispatch,
} from '../../../context';
import AuthWrapper from '../Components/Auth/AuthWrapper';
import PasswordValidator from '../Components/Auth/PasswordValidator';
import { recoverSchema } from '../Components/Auth/validations';

export default function NewPass() {
  const theme = useTheme();
  const dispatch = useAuthDispatch();
  const { token } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const { loading, errorMessage } = useAuthState();

  const formik = useFormik({
    validationSchema: recoverSchema,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      token: token,
      password1: '',
      password2: '',
    },
    onSubmit: values => {
      const validate = PasswordValidator(values.password1);
      if (!validate) {
        setError('La contraseña no cumple con las condiciones');
        formik.setSubmitting(false);
      } else if (values.password1 !== values.password2) {
        setError('Las contraseñas deben ser iguales');
        formik.setSubmitting(false);
      } else {
        confirmRecoveryPassword(dispatch, {
          token: values.token,
          password: values.password1,
        });
        navigate(`/login`);
      }
    },
  });

  return (
    <AuthWrapper>
      <Box>
        <Center>
          <Logo />
        </Center>
      </Box>
      <Box>
        <Box>
          <VStack spacing={3} align="flex-start">
            <Box my={2}>
              <Text fontSize="17px" color="#36355F">
                Debes ingresar una nueva contraseña para poder iniciar sesión.
                Tu contraseña debe contener al menos 8 caracteres, al menos 1
                número, al 1 una letra mayúscula, al 1 una letra minúscula y al
                menos 1 caracter especial.
              </Text>
            </Box>
            <Input
              name="password1"
              type={show ? 'text' : 'password'}
              label="Contraseña"
              value={formik.values.password1}
              onChange={formik.handleChange}
              error={
                formik.touched.password1 && Boolean(formik.errors.password1)
              }
              helperText={formik.touched.password1 && formik.errors.password1}
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
              name="password2"
              type={show ? 'text' : 'password'}
              label="Repita ontraseña"
              value={formik.values.password2}
              onChange={formik.handleChange}
              error={
                formik.touched.password2 && Boolean(formik.errors.password2)
              }
              helperText={formik.touched.password2 && formik.errors.password2}
              onKeyDown={e => {
                if (formik.isValid && e.key === 'Enter') {
                  formik.submitForm();
                }
              }}
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
            ></Input>
          </VStack>
          <Box my={2}>
            {errorMessage && (
              <Text fontSize={14} color="red.500" fontWeight="700">
                {errorMessage}
              </Text>
            )}
          </Box>
          {error && (
            <Box my={2}>
              <Text fontSize="17px" color="red">
                {error}
              </Text>
            </Box>
          )}
          <Center mt="20px">
            <Button
              isLoading={loading}
              onClick={formik.handleSubmit}
              isDisabled={!formik.isValid}
            >
              Guardar
            </Button>
          </Center>
        </Box>
      </Box>
    </AuthWrapper>
  );
}
