import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
} from "@chakra-ui/react";
import { Todo } from "../templates/Home";
import { BiTrash } from "react-icons/bi";

type TableContentsProps = {
  todo: Todo[];
};

export const TableContents: React.FC<TableContentsProps> = ({ todo }) => {
  return (
    <TableContainer mt={10} ml={44} mr={44}>
      <Table variant="simple">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Title</Th>
            <Th isNumeric>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {todo.map((e, idx) => (
            <Tr key={idx}>
              <Td>{e.id}</Td>
              <Td>{e.title}</Td>
              <Td isNumeric>
                <IconButton icon={<BiTrash />} aria-label={""} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
