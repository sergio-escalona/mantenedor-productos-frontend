import { useState } from 'react';
import {
  Box,
  Center,
  Flex,
  Link,
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
import { loginUser, useAuthState, useAuthDispatch } from '../../../context';
import { validUser } from '../../../context/actions';
import AuthWrapper from '../Components/Auth/AuthWrapper';
import { loginSchema } from '../Components/Auth/validations';

export default function Login() {
  const theme = useTheme();
  const dispatch = useAuthDispatch();

  const [show, setShow] = useState(false);
  const { loading, errorMessage } = useAuthState();

  const formik = useFormik({
    validationSchema: loginSchema,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      validUser(dispatch, {
        email: values.email,
        password: values.password,
      }).then(res => {
        loginUser(dispatch, {
          user: res?.user,
          token: res?.token,
        });
      });
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
            <Input
              name="email"
              label="Correo"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <Input
              name="password"
              type={show ? 'text' : 'password'}
              label="Contraseña"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
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
            <Flex width="100%" justifyContent="flex-end">
              <Link href="/forgot-password" fontSize={14} color="brand.500">
                Olvidaste tu contraseña
              </Link>
            </Flex>
          </VStack>
          <Box my={2}>
            {errorMessage && (
              <Text fontSize={14} color="red.500" fontWeight="700">
                {errorMessage}
              </Text>
            )}
          </Box>
          <Center mt="20px">
            <Button
              isLoading={loading}
              onClick={formik.handleSubmit}
              isDisabled={!formik.isValid}
            >
              Ingresar
            </Button>
          </Center>
        </Box>
      </Box>
    </AuthWrapper>
  );
}
