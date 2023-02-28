import { Select } from '@chakra-ui/react';

export default function TableFilterSelect({ children, ...props }) {
  return (
    <Select
      borderColor="#D7DBDF"
      h="28px"
      fontSize={12}
      color="black"
      {...props}
    >
      <option value="">Ver todo</option>
      {children}
    </Select>
  );
}
