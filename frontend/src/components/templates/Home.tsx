import { useState, useEffect } from "react";
import { Box, Input, Button } from "@chakra-ui/react";
import { TableContents } from "../organisms/TableContents";

export type Todo = {
  id: number;
  title: string;
};

export const Home = () => {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [id, setId] = useState<number>(2);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    (async () => {
      const r = await fetch("http://localhost:8080/todo");
      const data = await r.json();
      setTodo(data);
    })();
  }, []);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    setTitle(title);
    event.preventDefault();
    const data = { id, title };

    const r = await fetch("http://localhost:8080/todo", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const d = await r.json();
    console.dir(d);
    console.log(title);
    setId(id + 1);
  };

  return (
    <Box mt={32}>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Input
          type="text"
          w={"2xl"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button ml={2} onClick={handleSubmit}>
          send
        </Button>
      </Box>

      <TableContents todo={todo} />
    </Box>
  );
};
