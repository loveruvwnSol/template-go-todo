import { useState, useEffect } from "react";
import { Box, Input, Button } from "@chakra-ui/react";
import { TableContents } from "../organisms/TableContents";

export type Todo = {
  id: number;
  title: string;
};

export const Home = () => {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [id, setId] = useState<string>();
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    (async () => {
      const r = await fetch("http://localhost:8080/todo");
      const data = await r.json();
      setTodo(data);
      setId(JSON.stringify(todo.length + 1));
    })();
  }, [todo]);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    if (title.match(/\S/g)) {
      setTitle(title);
      event.preventDefault();
      const data = { id, title };

      const r = await fetch("http://localhost:8080/todo", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const d = await r.json();
      console.dir(d);
      setTitle("");
    } else {
      alert("please input todo");
    }
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
