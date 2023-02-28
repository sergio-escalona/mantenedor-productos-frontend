import { Input } from '@chakra-ui/react';

export default function TableFilterInput({ ...props }) {
  return (
    <Input
      borderColor="#D7DBDF"
      px={2}
      maxH="28px"
      fontSize={12}
      color="black"
      {...props}
    />
  );
}
