import { Box, Center, Text, VStack } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { Button, Input, Logo } from '../../../shared/components';
import {
  requestRecoveryPassword,
  useAuthState,
  useAuthDispatch,
} from '../../../context';
import AuthWrapper from '../Components/Auth/AuthWrapper';
import { forgotSchema } from '../Components/Auth/validations';

export default function ForgotPassword() {
  const dispatch = useAuthDispatch();

  const { loading, errorMessage } = useAuthState();

  const formik = useFormik({
    validationSchema: forgotSchema,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      email: '',
    },
    onSubmit: values => {
      requestRecoveryPassword(dispatch, {
        email: values.email,
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
              Recuperar
            </Button>
          </Center>
        </Box>
      </Box>
    </AuthWrapper>
  );
}
