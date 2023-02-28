import { FormLabel } from '@chakra-ui/react';

export default function CustomFormLabel({ htmlFor, label }) {
  return (
    <FormLabel fontWeight="700" mb="3px" fontSize={14} htmlFor={htmlFor}>
      {label}
    </FormLabel>
  );
}
