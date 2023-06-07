import {
  Text,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Todo } from "../templates/Home";
import { BiTrash, BiPencil } from "react-icons/bi";
import { useState } from "react";
import { EditModal } from "../molecules/EditModal";

type TableContentsProps = {
  todo: Todo[];
  fetchTodo: () => void;
};

export const TableContents: React.FC<TableContentsProps> = ({
  todo,
  fetchTodo,
}) => {
  const [id, setId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const openModal = (id: string, title: string) => {
    setId(id);
    setTitle(title);
    onOpen();
  };

  const deleteTodo = async (id: string) => {
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
            <Th isNumeric>Edit</Th>
            <Th isNumeric>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {todo.map((e, idx) => {
            return (
              <Tr key={idx}>
                <Td>{e.id}</Td>
                <Td>
                  <Text>{e.title}</Text>
                </Td>
                <Td isNumeric>
                  <IconButton
                    bg={"green.300"}
                    _hover={{ bg: "green.400" }}
                    icon={<BiPencil />}
                    aria-label={""}
                    onClick={() => openModal(e.id, e.title)}
                  />
                </Td>
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
      <EditModal
        isOpen={isOpen}
        onClose={onClose}
        id={id}
        title={title}
        fetchTodo={fetchTodo}
      />
    </TableContainer>
  );
};
