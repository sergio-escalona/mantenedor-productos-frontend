import { useId } from 'react';
import { FormControl, FormHelperText, Select } from '@chakra-ui/react';
import FormLabel from './FormLabel';

export default function CustomInput({
  name,
  label,
  value,
  error,
  helperText,
  onChange,
  required,
  children,
  isReadOnly,
  ...props
}) {
  const id = useId();
  return (
    <FormControl isRequired={required} isInvalid={error}>
      <FormLabel htmlFor={id} label={label} />
      <Select
        name={name}
        onChange={onChange}
        id={id}
        value={value}
        isInvalid={error}
        borderRadius="10px"
        borderWidth={1}
        borderColor={error ? 'red.500' : '#D6D8EB'}
        minH="48px"
        fontSize={14}
        pointerEvents={isReadOnly ? 'none' : 'inherit'}
        {...props}
      >
        {children}
      </Select>
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
