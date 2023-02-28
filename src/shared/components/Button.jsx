import { Button } from '@chakra-ui/react';

const defaultProps = {
  variant: 'solid',
};

export default function CustomButton({
  children,
  isLoading,
  disabled,
  onClick,
  variant,
  ...props
}) {
  let colors;
  colors = {
    outline: {
      color: 'brand.500',
      bg: '#D9E9E7',
    },
    solid: {
      color: 'white',
      bg: 'brand.500',
    },
    ghost: {
      color: 'brand.500',
      bg: '#D9E9E7',
    },
  };
  return (
    <Button
      bg={colors[variant].bg}
      color={colors[variant].color}
      borderRadius={10}
      _focus={{ backgroundColor: colors[variant].bg }}
      _hover={{ backgroundColor: colors[variant].bg }}
      _pressed={{ backgroundColor: colors[variant].bg }}
      isLoading={isLoading}
      borderWidth={0}
      fontSize={14}
      borderColor="brand.500"
      onClick={onClick}
      isDisabled={disabled}
      {...props}
    >
      {children}
    </Button>
  );
}

CustomButton.defaultProps = defaultProps;
