import { useState } from 'react';
import {
  Box,
  Center,
  Flex,
  HStack,
  Link,
  Text,
  VStack,
  SimpleGrid,
  GridItem,
  InputRightElement,
  IconButton,
  useTheme,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  AiOutlineEye as ViewIcon,
  AiOutlineEyeInvisible as HideIcon,
} from 'react-icons/ai';
import { Button, Input, Logo } from '../../../shared/components';
import { loginUser, useAuthState, useAuthDispatch } from '../../../context';
import { IMAGES } from '../../../config/constants';
import { validUser } from '../../../context/actions';

const loginSchema = Yup.object().shape({
  email: Yup.string().required('El correo es obligatorio'),
  password: Yup.string().required('El contraseña es obligatorio'),
});

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
    <Box h="100%">
      <SimpleGrid
        columns={12}
        spacing={5}
        py={{ base: 1, md: 2, lg: 3 }}
        h="100%"
        px={{ base: 1, md: 3, lg: 3 }}
      >
        <GridItem
          display={{ base: 'none', lg: 'block' }}
          colSpan={{ base: 12, md: 12, lg: 8 }}
        >
          <Box h="100%">
            <Box
              borderColor="red.500"
              bgImage={IMAGES.AUTH_BG.source}
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundPosition="center"
              borderRadius={{ base: '10px', md: '15px', lg: '20px' }}
              h="100%"
              w="100%"
            />
          </Box>
        </GridItem>
        <GridItem colSpan={{ base: 12, md: 12, lg: 4 }}>
          <Center h="100%">
            <Box>
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
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                    <Input
                      name="password"
                      type={show ? 'text' : 'password'}
                      label="Contraseña"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
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
                                <HideIcon
                                  size={20}
                                  color={theme.colors.brand[500]}
                                />
                              ) : (
                                <ViewIcon
                                  size={20}
                                  color={theme.colors.brand[500]}
                                />
                              )
                            }
                          />
                        </InputRightElement>
                      }
                    ></Input>
                    <Flex width="100%" justifyContent="flex-end">
                      <Link
                        href="/recovery-password"
                        fontSize={14}
                        color="brand.500"
                      >
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
            </Box>
          </Center>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}
