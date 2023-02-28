import { FormControl, FormHelperText, Input } from '@chakra-ui/react';
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
  ...props
}) {
  const id = useId();
  return (
    <FormControl isRequired={required} isInvalid={error}>
      <FormLabel htmlFor={id} label={label} />
      <Input
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        id={id}
        type={type}
        value={value}
        borderWidth={1}
        minH="50px"
        borderRadius="10px"
        borderColor="#D6D8EB"
        fontSize={14}
        {...props}
      />
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
