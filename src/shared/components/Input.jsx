import {
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
} from '@chakra-ui/react';
import { useId } from 'react';
import FormLabel from './FormLabel';

export default function CustomInput({
  name,
  label,
  value,
  error,
  helperText,
  type,
  onChange,
  onBlur,
  required,
  children,
  ...props
}) {
  const id = useId();
  return (
    <FormControl isRequired={required} isInvalid={error}>
      <FormLabel htmlFor={id} label={label} />
      <InputGroup>
        <Input
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          id={id}
          type={type}
          value={value}
          borderWidth={2}
          minH="50px"
          borderRadius="10px"
          borderColor={!error ? '#D6D8EB' : '#FF0000'}
          {...props}
        />
        {children}
      </InputGroup>
      {helperText && error && (
        <FormHelperText color="red.500" fontSize={13}>
          <>{helperText}</>
        </FormHelperText>
      )}
    </FormControl>
  );
}

CustomInput.defaultProps = {
  type: 'text',
};
