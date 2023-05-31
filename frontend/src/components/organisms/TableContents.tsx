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
  fetchTodo: () => void;
};

export const TableContents: React.FC<TableContentsProps> = ({
  todo,
  fetchTodo,
}) => {

  const deleteTodo = async (id: string) => {
    console.log(id);
    const r = await fetch("http://localhost:8080/todo/" + id, {
      method: "POST",
    });
    fetchTodo();
  };

  return (
    <TableContainer mt={10} ml={44} mr={44}>
      <Table variant="simple">
        <TableCaption>React + go todo app</TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Title</Th>
            <Th isNumeric>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {todo.map((e, idx) => {
            return (
              <Tr key={idx}>
                <Td>{e.id}</Td>
                <Td>{e.title}</Td>
                <Td isNumeric>
                  <IconButton
                    icon={<BiTrash />}
                    aria-label={""}
                    onClick={() => deleteTodo(e.id)}
                  />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
