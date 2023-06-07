import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

type EditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  title: string;
  fetchTodo: () => void;
};

export const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  id,
  title,
  fetchTodo,
}) => {
  const [newTitle, setNewTitle] = useState<string>("");

  const editTodo = async (id: string) => {
    if (newTitle.match(/\S/g)) {
      const r = await fetch("http://localhost:8080/todo/patch/" + id, {
        method: "POST",
        body: JSON.stringify({ title: newTitle }),
      });
      fetchTodo();
      setNewTitle("");
      onClose();
    } else {
      alert("please input todo text");
    }
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit your todo!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            type="text"
            placeholder={title}
            onChange={(t) => setNewTitle(t.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            bg={"green.300"}
            _hover={{ bg: "green.400" }}
            onClick={() => editTodo(id)}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
